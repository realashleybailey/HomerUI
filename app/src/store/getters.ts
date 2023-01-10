import { GetterTree } from 'vuex';
import { Groups } from '../@types/Groups';
import { RootState } from './';
import { State } from './state';

export type Getters = {
    dashboard(_state: State, _getters: any, rootState: RootState, _rootGetters: any): Groups
};

export const getters: GetterTree<State, RootState> & Getters = {
    dashboard(_state, _getters, rootState, _rootGetters) {
        // Clone the groups to break the reference
        const groups = JSON.parse(JSON.stringify(rootState.groups.groups)) as Groups;
        const services = rootState.services.services;

        // If there are no services, return an empty array
        if (!services || !services.length) {
            return [];
        }

        // If there are no groups, return an array with a single group
        if (!groups || !groups.length) {
            return [];
        }

        // Add the services to the groups
        groups.forEach((group) => {
            group.items = services.filter((service) => service.group_id === group.id);
        });

        // Return the groups
        return groups;
    }
};