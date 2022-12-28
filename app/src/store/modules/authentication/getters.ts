import { GetterTree } from 'vuex';
import { RootState } from '../..';
import { User } from '../../../@types/User';
import { State } from './state';

export type Getters = {
    token(state: State): string | null;
    user(state: State): User | null;
};

export const getters: GetterTree<State, RootState> & Getters = {
    token(state) {
        return state.token;
    },
    user(state) {
        return state.user;
    },
    isLoggedIn(state) {
        return !!state.token;
    }
};