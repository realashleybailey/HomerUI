import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '../..';
import { Settings } from '../../../@types/Settings';
import { Mutations } from './mutations';
import { State } from './state';
// import { ServiceActionTypes } from './action-types';

type AugmentedActionContext = { commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>; } & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
    getSettings(context: AugmentedActionContext, payload: { id: number }): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async getSettings({ commit, state, rootState }) {
        // Get settings from the server
        const response = await fetch('/api/settings', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token
            }
        });

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to get settings');
        }

        // Get the settings from the response
        const settings: Settings = await response.json();
        delete settings['id'];

        if (settings.title) commit('setTitle', settings.title)
        if (settings.subtitle) commit('setSubtitle', settings.subtitle)
        if (settings.logo) commit('setLogo', settings.logo)
        if (settings.headerDisabled) commit('setHeaderDisabled', !!settings.headerDisabled)
        if (settings.message) commit('setMessage', settings.message)
        if (settings.links) commit('setLinks', settings.links)
        if (settings.footer) commit('setFooter', settings.footer)
        if (settings.footerDisabled) commit('setFooterDisabled', !!settings.footerDisabled)
    },
    async getSupportedApps({ commit }) {
        // Get the supported apps from the API
        const response = await fetch('/api/supportedapps', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to get supported apps');
        }

        // Get the supported apps from the response
        const data = await response.json();
        const supportedApps = data.apps;

        // Commit the supported apps to the state
        commit('setSupportedApps', supportedApps);

        // Return the supported apps
        return supportedApps;
    },
};