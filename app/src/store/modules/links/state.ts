import { Links } from '../../../@types/Links';

export type State = {
    links: Links;
}

export const state: State = {
    links: [
        {
            id: 1,
            name: "Home",
            url: "/",
            icon: "fas fa-house",
            target: "_self",
        }
    ]
}