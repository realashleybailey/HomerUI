import type { Services } from '../../../@types/Service';

export type State = {
    services: Services;
}

export const state: State = {
    services: [],
}