import { GetterTree } from 'vuex';
import { RootState } from '../..';
import { Services } from '../../../@types/Service';
import { State } from './state';

export type Getters = {
    services(state: State): Services;
};

export const getters: GetterTree<State, RootState> & Getters = {
    services(state) {
        return state.services;
    }
};