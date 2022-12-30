import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '../..';
import { Message, Messages } from '../../../@types/Message';
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
    async getMessage({ commit, rootState }, id) {

    },
    async createMessage({ commit, rootState }, message: Message): Promise<Message> {
        // Create the message on the server
        const response = await fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token || '',
            },
            body: JSON.stringify(message),
        })

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to create message')
        }

        // Get the message from the response
        const createdMessage = await response.json()

        // Commit the message to the state
        commit('addMessage', createdMessage)

        // Return the message
        return createdMessage
    },
    async updateMessage(context: AugmentedActionContext, payload: { id: number, message: Message }): Promise<Message> {

    },
    async deleteMessage(context: AugmentedActionContext, id: number): Promise<void> {

    },
};