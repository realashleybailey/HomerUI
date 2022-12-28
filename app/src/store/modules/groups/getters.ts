import { GetterTree } from 'vuex';
import { RootState } from '../..';
import { Groups } from '../../../@types/Groups';
import { State } from './state';

export type Getters = {
    groups(state: State): Groups;
};

export const getters: GetterTree<State, RootState> & Getters = {
    groups(state) {
        return state.groups;
    }
};