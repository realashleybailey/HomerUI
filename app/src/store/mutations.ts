import { MutationTree } from 'vuex';
import { store } from '.';
import { Groups } from '../@types/Groups';
import { State } from './state';

export type Mutations<S = State> = {
    setDashboard(state: S, dashboard: Groups): void;
};

export const mutations: MutationTree<State> & Mutations = {
    setDashboard(state, dashboard) {
        state.dashboard = dashboard
    }
};