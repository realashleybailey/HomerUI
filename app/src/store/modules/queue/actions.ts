import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '../..';
import { Mutations } from './mutations';
import { State } from './state';
// import { ServiceActionTypes } from './action-types';

type AugmentedActionContext = { commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>; } & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
    addJob(context: AugmentedActionContext, job: any): void;
    startNextJob(context: AugmentedActionContext): void;
}

export const actions: ActionTree<State, RootState> & Actions = {
    addJob({ commit, state, dispatch }, job) {
        commit('addPendingJob', job);

        if (Object.keys(state.active).length == 0) {
            dispatch('startNextJob');
        }
    },

    startNextJob({ commit, state }) {
        if (Object.keys(state.active).length > 0) {
            commit('addCompletedJob', state.active);
        }

        if (state.pending.length > 0) {
            commit('setActiveJob', state.pending[0]);
            commit('popCurrentJob', undefined);
        } else {
            commit('setActiveJob', {});
        }
    }
};