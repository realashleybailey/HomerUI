
export type State = {
    pending: string[];
    completed: string[];
    active: { [key: string]: boolean };
}

export const state: State = {
    pending: [],
    completed: [],
    active: {}
}