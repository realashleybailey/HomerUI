import { Messages } from "../../../@types/Message";

export type State = {
    messages: Messages;
}

export const state: State = {
    messages: [
        {
            title: "👋 Welcome !",
            content: "Welcome to HomerUI, the possibilities are endless. Feel free to have a look around!<br /> You can find more information on <a href='https://github.com/realashleybailey/homerui' target='_blank'>github.com/realashleybailey/HomerUI</a>",
            style: "is-dark",
            disabled: false,
        }
    ],
}