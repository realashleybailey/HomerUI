import { Colors } from "../../../@types/Colors"
import { Message } from "../../../@types/Message"
import { App } from "../../../@types/SupportedApps"

export type State = {
    configurationNeeded: boolean,
    title: string,
    subtitle: string,
    logo: string,
    icon: string,
    headerDisabled: boolean,
    footer: string,
    footerDisabled: boolean,
    supportedApps: App[],
    defaults: {
        layout: string,
        colorTheme: string,
    },
    vLayout: boolean,
    isDark: boolean,
    colorTheme: number,
    colors: Colors,
    liveStatsDisabled: boolean,
}

export const state: State = {
    configurationNeeded: true,
    title: "HomerUI",
    subtitle: "Dashboard",
    logo: "/assets/tools/homer.png",
    icon: "",
    headerDisabled: false,
    footer: "Made with ❤️ by <a href='https://github.com/realashleybailey' target='_blank'>Ashley Bailey</a>",
    footerDisabled: false,
    supportedApps: [],
    defaults: {
        layout: "columns",
        colorTheme: "auto",
    },
    vLayout: true,
    isDark: true,
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
        },
    },
    liveStatsDisabled: true,
}