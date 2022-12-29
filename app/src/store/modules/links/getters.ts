import { GetterTree } from 'vuex';
import { RootState } from '../..';
import { Links } from '../../../@types/Links';
import { State } from './state';

export type Getters = {
    links(state: State): Links;
};

export const getters: GetterTree<State, RootState> & Getters = {
    links(state) {
        return state.links;
    }
};