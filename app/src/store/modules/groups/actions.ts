import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '../..';
import { Groups } from '../../../@types/Groups';
import { Mutations } from './mutations';
import { State } from './state';
// import { ServiceActionTypes } from './action-types';

type AugmentedActionContext = { commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>; } & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
    getGroups(context: AugmentedActionContext): Promise<Groups>;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async getGroups({ commit, rootState }: AugmentedActionContext) {
        // Get the groups from the API using token authentication
        const response = await fetch('/api/group', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token || '',
            },
        });

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to get groups')
        }

        // Get the groups from the response
        const groups = await response.json()

        // Commit the groups to the state
        commit('setGroups', groups)

        // Return the groups
        return groups
    }
};