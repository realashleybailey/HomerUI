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
    async getStatus({ commit, state }) {
        if (state.configurationNeeded === null || state.configurationNeeded === true) {
            const response = await fetch("/api/status");
            const status = await response.json();

            console.log(status);

            commit('setConfigurationNeeded', !status.database);
        }
    },
    resetSettings({ commit }) {
        commit('setTitle', "HomerUI");
        commit('setSubtitle', "Dashboard");
        commit('setLogo', "/assets/tools/homer.png");
        commit('setIcon', "");
        commit('setHeaderDisabled', false);
        commit('setFooter', "Made with ❤️ by <a href='https://github.com/realashleybailey' target='_blank'>Ashley Bailey</a>");
        commit('setFooterDisabled', false);
        commit('setDefaults', {
            layout: "columns",
            colorTheme: "auto",
        });
        commit('setVLayout', true);
        commit('setIsDark', true);
        commit('setColorTheme', 0);
        commit('setLiveStatsDisabled', true);
    },
};