import { MutationTree } from 'vuex';
import { State } from './state';

export type Mutations<S = State> = {
    addPendingJob(state: S, payload: any): void;
    setActiveJob(state: S, payload: any): void;
    popCurrentJob(state: S): void;
    addCompletedJob(state: S, payload: any): void;
};

export const mutations: MutationTree<State> & Mutations = {
    addPendingJob(state, job) {
        state.pending.push(job);
    },
    setActiveJob(state, job) {
        state.active = job;
    },
    popCurrentJob(state) {
        state.pending.shift();
    },
    addCompletedJob(state, job) {
        state.completed.push(job);
    }
};