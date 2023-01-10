import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '../..';
import { Links } from '../../../@types/Links';
import { Mutations } from './mutations';
import { State } from './state';
// import { ServiceActionTypes } from './action-types';

type AugmentedActionContext = { commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>; } & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
    getLinks(context: AugmentedActionContext, payload: { id: number }): Promise<Links>;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async getLinks({ commit, state, rootState }) {
        // Get links from the server
        const response = await fetch('/api/link', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token
            }
        });

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to get links');
        }

        // Get the links from the response
        const links = await response.json();

        // Commit the links to the state
        commit('setLinks', links);

        // Return the links
        return links;
    },
    async getLink({ commit, state, rootState }, id) {
        // Get link from the server
        const response = await fetch(`/api/link/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token
            }
        });

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to get link');
        }

        // Get the link from the response
        const link = await response.json();

        // Commit the link to the state
        commit('addLink', link);

        // Return the link
        return link;
    },
    async createLink({ commit, state, rootState }, link) {
        // Create link on the server
        const response = await fetch('/api/link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token
            },
            body: JSON.stringify(link)
        });

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to create link');
        }

        // Get the link from the response
        const createdLink = await response.json();

        // Commit the link to the state
        commit('addLink', createdLink);

        // Return the link
        return createdLink;
    },
    async updateLink({ commit, state, rootState }, link) {
        // Update link on the server
        const response = await fetch(`/api/link/${link.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token
            },
            body: JSON.stringify(link)
        });

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to update link');
        }

        // Get the link from the response
        const updatedLink = await response.json();

        // Commit the link to the state
        commit('updateLink', updatedLink);

        // Return the link
        return updatedLink;
    },
    async deleteLink({ commit, rootState }, id) {
        // Delete link from the server
        const response = await fetch(`/api/link/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token
            }
        });

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to delete link');
        }

        // Commit the link to the state
        commit('deleteLink', id);

        // Return the link
        return id;
    },
    resetLinks({ commit }) {
        commit('setLinks', [
            {
                id: 1,
                name: "Home",
                url: "/",
                icon: "fas fa-house",
                target: "_self",
            }
        ]);
    }
};