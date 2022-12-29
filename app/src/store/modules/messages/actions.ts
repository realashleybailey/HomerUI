import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '../..';
import { Messages } from '../../../@types/Message';
import { Mutations } from './mutations';
import { State } from './state';
// import { ServiceActionTypes } from './action-types';

type AugmentedActionContext = { commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>; } & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
    getMessages(context: AugmentedActionContext): Promise<Messages>;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async getMessages({ commit, rootState }) {
        // Get the messages from the API using token authentication
        const response = await fetch('/api/message', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token || '',
            },
        })

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to get messages')
        }

        // Get the messages from the response
        const messages = await response.json()

        // Commit the messages to the state
        commit('setMessages', messages)

        // Return the messages
        return messages
    },
};