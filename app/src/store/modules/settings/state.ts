import { Colors } from "../../../@types/Colors"
import { Links } from "../../../@types/Links"
import { Message } from "../../../@types/Message"
import { App } from "../../../@types/SupportedApps"

export type State = {
    title: string,
    subtitle: string,
    logo: string,
    icon: string,
    headerDisabled: boolean,
    message: Message,
    footer: string,
    footerDisabled: boolean,
    supportedApps: App[],
    defaults: {
        layout: string,
        colorTheme: string,
    },
    links: Links,
    vLayout: boolean,
    isDark: boolean,
    colorTheme: number,
    colors: Colors
}

export const state: State = {
    title: "HomerUI",
    subtitle: "Dashboard",
    logo: "/assets/tools/homer.png",
    icon: "",
    headerDisabled: false,
    message: {
        title: "👋 Welcome !",
        content: "Welcome to Homer, the possibilities are endless. Feel free to have a look around!<br /> You can find more information on <a href='https://github.com/bastienwirtz/homer'>github.com/bastienwirtz/homer</a>",
        style: "is-dark",
        disabled: false,
    },
    footer: "Made with ❤️ by <a href='https://github.com/realashleybailey' target='_blank'>Ashley Bailey</a>",
    footerDisabled: false,
    supportedApps: [],
    defaults: {
        layout: "columns",
        colorTheme: "auto",
    },
    links: [
        {
            name: "Home",
            url: "/",
            icon: "fas fa-house",
            target: "_self",
        }
    ],
    vLayout: true,
    isDark: false,
    colorTheme: 0,
    colors: {
        "light": {
            "highlight-primary": "#3367d6",
            "highlight-secondary": "#4285f4",
            "highlight-hover": "#5a95f5",
            "background": "#f5f5f5",
            "card-background": "#ffffff",
            "text": "#363636",
            "text-header": "#ffffff",
            "text-title": "#303030",
            "text-subtitle": "#424242",
            "card-shadow": "rgba(0, 0, 0, 0.1)",
            "link": "#3273dc",
            "link-hover": "#363636",
            "background-image": ""
        },
        "dark": {
            "highlight-primary": "#3367d6",
            "highlight-secondary": "#4285f4",
            "highlight-hover": "#5a95f5",
            "background": "#131313",
            "card-background": "#2b2b2b",
            "text": "#eaeaea",
            "text-header": "#ffffff",
            "text-title": "#fafafa",
            "text-subtitle": "#f5f5f5",
            "card-shadow": "rgba(0, 0, 0, 0.4)",
            "link": "#3273dc",
            "link-hover": "#ffdd57",
            "background-image": ""
        }
    },
}