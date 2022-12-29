import { MutationTree } from 'vuex';
import { Messages } from '../../../@types/Message';
import { State } from './state';

export type Mutations<S = State> = {
    setMessages(state: S, messages: Messages): void;
};

export const mutations: MutationTree<State> & Mutations = {
    setMessages(state, messages: Messages) {
        state.messages = messages;
    }
};