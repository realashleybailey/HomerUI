import { MutationTree } from 'vuex';
import { User } from '../../../@types/User';
import { State } from './state';

export type Mutations<S = State> = {
    setToken(state: S, token: string | null): void;
    setUser(state: S, user: User | null): void;
};

export const mutations: MutationTree<State> & Mutations = {
    setToken(state, token) {
        state.token = token;
    },
    setUser(state, user) {
        state.user = user;
    }
};