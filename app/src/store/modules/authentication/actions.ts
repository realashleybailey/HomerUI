import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '../..';
import { Mutations } from './mutations';
import { State } from './state';
// import { ServiceActionTypes } from './action-types';

import router from '../../../router';
import VueJwtDecode from 'vue-jwt-decode';

type AugmentedActionContext = { commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>; } & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
    login(context: AugmentedActionContext, payload: { username: string, password: string }): void;
    logout(context: AugmentedActionContext): void;
    checkToken(context: AugmentedActionContext): boolean;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async login({ commit, dispatch }, payload) {
        // Get the username and password from the payload
        const { username, password } = payload;

        // Make a call to the API to login
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        });

        // If the response is not ok, throw an error
        if (!response.ok) {
            return (await response.json()).message;
        }

        // Get the response
        const data = await response.json();

        // Get the token and user from the response
        const token = data.token;

        // Decode the token to check it is valid
        const decodedToken = VueJwtDecode.decode(token);

        // If the token is not valid, throw an error
        if (!decodedToken) {
            throw new Error('Invalid token');
        }

        const user = data.user;

        // Set the token and user in the state
        commit('setToken', token);
        commit('setUser', user);

        // Update other modules
        await dispatch("getSettings");
        await dispatch("getServices");
        await dispatch("getGroups");
        await dispatch("getLinks");
        await dispatch("getMessages");
        
        // Redirect to the home page
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('redirect');

        if (redirect) router.push(redirect);
        else router.push('/');
    },
    async logout({ commit, state, dispatch }) {
        // Set the token and user in the state to null
        commit('setToken', null);
        commit('setUser', null);

        // Update other modules
        dispatch("resetSettings");
        dispatch("resetServices");
        dispatch("resetGroups");
        dispatch("resetLinks");
        dispatch("resetMessages");

        // Redirect to the login page
        router.push('/login');

        // Make a call to the API to logout
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + state.token,
            },
        });

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to logout');
        }
    },
    checkToken({ commit, state }) {
        // If the token is null, return false
        if (!state.token) return true;

        // Get the expiry from the token
        const expiry = (JSON.parse(atob(state.token.split('.')[1]))).exp;
        const isTokenExpired = (Math.floor((new Date).getTime() / 1000)) >= expiry;

        // If the token is expired, set the token and user in the state to null
        if (isTokenExpired) commit('setToken', null);
        if (isTokenExpired) commit('setUser', null);

        // Return isTokenExpired
        return isTokenExpired;
    }
};