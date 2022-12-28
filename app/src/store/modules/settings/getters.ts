import { GetterTree } from 'vuex';
import { RootState } from '../..';
import { Colors } from '../../../@types/Colors';
import { Links } from '../../../@types/Links';
import { Message } from '../../../@types/Message';
import { App } from '../../../@types/SupportedApps';
import { State } from './state';

export type Getters = {
    title(state: State): string;
    subtitle(state: State): string;
    logo(state: State): string;
    icon(state: State): string;
    headerDisabled(state: State): boolean;
    message(state: State): Message;
    footer(state: State): string;
    footerDisabled(state: State): boolean;
    supportedApps(state: State): App[];
    defaults(state: State): { layout: string; colorTheme: string; };
    links(state: State): Links;
    vLayout(state: State): boolean;
    isDark(state: State): boolean;
    colorTheme(state: State): number;
    colors(state: State): Colors;
};

export const getters: GetterTree<State, RootState> & Getters = {
    title: (state) => state.title,
    subtitle: (state) => state.subtitle,
    logo: (state) => state.logo,
    icon: (state) => state.icon,
    headerDisabled: (state) => state.headerDisabled,
    message: (state) => state.message,
    footer: (state) => state.footer,
    footerDisabled: (state) => state.footerDisabled,
    supportedApps: (state) => state.supportedApps,
    defaults: (state) => state.defaults,
    links: (state) => state.links,
    vLayout: (state) => state.vLayout,
    isDark: (state) => state.isDark,
    colorTheme: (state) => state.colorTheme,
    colors: (state) => state.colors,
};