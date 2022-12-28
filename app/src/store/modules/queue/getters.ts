import { GetterTree } from 'vuex';
import { RootState } from '../..';
import { State } from './state';

export type Getters = {
    PENDING(state: State): string[];
    ACTIVE(state: State): { [key: string]: boolean };
    COMPLETED(state: State): string[];
};

export const getters: GetterTree<State, RootState> & Getters = {
    PENDING(state) {
        return state.pending;
    },

    ACTIVE(state) {
        return state.active;
    },

    COMPLETED(state) {
        return state.completed;
    }
};