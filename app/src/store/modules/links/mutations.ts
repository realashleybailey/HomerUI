import { MutationTree } from 'vuex';
import { Links } from '../../../@types/Links';
import { State } from './state';

export type Mutations<S = State> = {
    setLinks(state: S, payload: Links): void;
};

export const mutations: MutationTree<State> & Mutations = {
    setLinks(state, links) {
        state.links = links
    },
    addLink(state, link) {
        state.links.push(link)
    },
    updateLink(state, { id, link }) {
        const index = state.links.findIndex(l => l.id === id)
        state.links[index] = link
    },
    deleteLink(state, id) {
        state.links = state.links.filter(l => l.id !== id)
    }
};