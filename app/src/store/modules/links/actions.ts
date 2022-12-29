import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '../..';
import { Links } from '../../../@types/Links';
import { Mutations } from './mutations';
import { State } from './state';
// import { ServiceActionTypes } from './action-types';

type AugmentedActionContext = { commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>; } & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
    getLinks(context: AugmentedActionContext, payload: { id: number }): Promise<Links>;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async getLinks({ commit, state, rootState }) {
        // Get links from the server
        const response = await fetch('/api/link', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token
            }
        });

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to get links');
        }

        // Get the links from the response
        const links = await response.json();

        // Commit the links to the state
        commit('setLinks', links);

        // Return the links
        return links;
    },
};