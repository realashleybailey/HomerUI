import { MutationTree } from 'vuex';
import { Groups } from '../../../@types/Groups';
import { State } from './state';

export type Mutations<S = State> = {
    setGroups(state: S, payload: Groups): void;
};

export const mutations: MutationTree<State> & Mutations = {
    setGroups(state, groups: Groups) {
        state.groups = groups;
    }
};