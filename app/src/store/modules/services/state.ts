import type { Services } from '../../../@types/Services';

export type State = {
    services: Services;
}

export const state: State = {
    services: [],
}