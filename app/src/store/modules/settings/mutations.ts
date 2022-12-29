import { MutationTree } from 'vuex';
import { Colors } from '../../../@types/Colors';
import { Links } from '../../../@types/Links';
import { Message } from '../../../@types/Message';
import { App } from '../../../@types/SupportedApps';
import { State } from './state';

export type Mutations<S = State> = {
    setConfigurationNeeded(state: S, configurationNeeded: boolean): void;
    setTitle(state: S, title: string): void;
    setSubtitle(state: S, subtitle: string): void;
    setLogo(state: S, logo: string): void;
    setIcon(state: S, icon: string): void;
    setHeaderDisabled(state: S, headerDisabled: boolean): void;
    setFooter(state: S, footer: string): void;
    setFooterDisabled(state: S, footerDisabled: boolean): void;
    setSupportedApps(state: S, supportedApps: App[]): void;
    setDefaults(state: S, defaults: { layout: string; colorTheme: string; }): void;
    setVLayout(state: S, vLayout: boolean): void;
    setDark(state: S, isDark: boolean): void;
    setColorTheme(state: S, colorTheme: number): void;
    setColors(state: S, colors: Colors): void;
    setSetting(state: S, payload: { name: string, value: any }): void;
};

export const mutations: MutationTree<State> & Mutations = {
    setConfigurationNeeded(state, configurationNeeded: boolean) {
        state.configurationNeeded = configurationNeeded;
    },
    setTitle(state, title: string) {
        state.title = title;
    },
    setSubtitle(state, subtitle: string) {
        state.subtitle = subtitle;
    },
    setLogo(state, logo: string) {
        state.logo = logo;
    },
    setIcon(state, icon: string) {
        state.icon = icon;
    },
    setHeaderDisabled(state, headerDisabled: boolean) {
        state.headerDisabled = headerDisabled;
    },
    setFooter(state, footer: string) {
        state.footer = footer;
    },
    setFooterDisabled(state, footerDisabled: boolean) {
        state.footerDisabled = footerDisabled;
    },
    setSupportedApps(state, supportedApps: App[]) {
        state.supportedApps = supportedApps;
    },
    setDefaults(state, defaults: { layout: string; colorTheme: string; }) {
        state.defaults = defaults;
    },
    setVLayout(state, vLayout: boolean) {
        state.vLayout = vLayout;
    },
    setDark(state, isDark: boolean) {
        state.isDark = isDark;
    },
    setColorTheme(state, colorTheme: number) {
        state.colorTheme = colorTheme;
    },
    setColors(state, colors: Colors) {
        state.colors = colors;
    },
    setSetting(state, payload: { name: string, value: any }) {
        state[payload.name] = payload.value;
    }
};