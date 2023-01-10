import { MutationTree } from 'vuex';
import { State } from './state';
// import { Service } from './mutation-types';
import { Service, Services } from '../../../@types/Service';

export type Mutations<S = State> = {
    setServices(state: S, payload: Services): void;
    addService(state: S, payload: Service): void;
    updateService(state: S, payload: { id: number, service: Service }): void;
    deleteService(state: S, payload: number): void;
};

export const mutations: MutationTree<State> & Mutations = {
    setServices(state, services) {
        state.services = services
    },
    addService(state, service) {
        state.services.push(service)
    },
    updateService(state, { id, service }) {
        const index = state.services.findIndex(s => s.id === id)
        state.services[index] = service
    },
    deleteService(state, id) {
        state.services = state.services.filter(s => s.id !== id)
    },
};