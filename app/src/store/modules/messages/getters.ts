import { GetterTree } from 'vuex';
import { RootState } from '../..';
import { Messages } from '../../../@types/Message';
import { State } from './state';

export type Getters = {
    messages(state: State): Messages;
};

export const getters: GetterTree<State, RootState> & Getters = {
    messages: (state) => state.messages,
};