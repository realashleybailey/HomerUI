import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '../..';
import { Service } from '../../../@types/Service';
import { Services } from '../../../@types/Services';
import { Mutations } from './mutations';
import { State } from './state';
// import { ServiceActionTypes } from './action-types';

type AugmentedActionContext = { commit<K extends keyof Mutations>(key: K, payload: Parameters<Mutations[K]>[1]): ReturnType<Mutations[K]>; } & Omit<ActionContext<State, RootState>, 'commit'>

export interface Actions {
    getServices(context: AugmentedActionContext): Promise<Services>;
    getService(context: AugmentedActionContext, id: number): Promise<Service>;
    createService(context: AugmentedActionContext, service: Service): Promise<Service>;
    updateService(context: AugmentedActionContext, payload: { id: number, service: Service }): Promise<Service>;
    deleteService(context: AugmentedActionContext, id: number): Promise<void>;
}

export const actions: ActionTree<State, RootState> & Actions = {
    async getServices({ commit, rootState }) {
        // Get the services from the API using token authentication
        const response = await fetch('/api/service', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token || '',
            },
        })

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to get services')
        }

        // Get the services from the response
        const services = await response.json()

        // Commit the services to the state
        commit('setServices', services)

        // Return the services
        return services
    },
    async getService({ commit, rootState }, id) {
        // Get the service from the API using token authentication
        const response = await fetch(`/api/services/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token || '',
            },
        })

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to get service' + id)
        }

        // Get the service from the response
        const service = await response.json()

        // Commit the service to the state
        // commit('setService', service)

        // Return the service
        return service
    },
    async createService({ commit, rootState }, service) {
        // Create the service in the API using token authentication
        const response = await fetch('/api/createservice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token || '',
            },
            body: service as any
        })

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to create service')
        }

        // Add the service to the state
        commit('addService', service)

        // Return the service
        return service
    },
    async updateService({ commit, rootState }, { id, service }) {
        // Update the service in the API using token authentication
        const response = await fetch('/api/service/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token || '',
            },
            body: service as any
        })

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to update service')
        }

        // Update the service in the state
        commit('updateService', { id, service })

        // Return the service
        return service
    },
    async deleteService({ commit, rootState }, id) {
        // Delete the service from the API using token authentication
        const response = await fetch('/api/service/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + rootState.authentication.token || '',
            }
        })

        // If the response is not ok, throw an error
        if (!response.ok) {
            throw new Error('Failed to delete service')
        }

        // Delete the service from the state
        commit('deleteService', id)

        // Return nothing
        return
    }
};