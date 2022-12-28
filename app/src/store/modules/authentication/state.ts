import { User } from "../../../@types/User";

export type State = {
    token: string | null;
    user: User | null;
}

export const state: State = {
    token: null,
    user: null,
}