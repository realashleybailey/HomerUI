import { GetterTree } from 'vuex';
import { RootState } from '../..';
import { Colors } from '../../../@types/Colors';
import { Message } from '../../../@types/Message';
import { App } from '../../../@types/SupportedApps';
import { State } from './state';

export type Getters = {
    configurationNeeded(state: State): boolean;
    title(state: State): string;
    subtitle(state: State): string;
    logo(state: State): string;
    icon(state: State): string;
    headerDisabled(state: State): boolean;
    footer(state: State): string;
    footerDisabled(state: State): boolean;
    supportedApps(state: State): App[];
    defaults(state: State): { layout: string; colorTheme: string; };
    vLayout(state: State): boolean;
    isDark(state: State): boolean;
    colorTheme(state: State): number;
    colors(state: State): Colors;
};

export const getters: GetterTree<State, RootState> & Getters = {
    configurationNeeded: (state) => state.configurationNeeded,
    title: (state) => state.title,
    subtitle: (state) => state.subtitle,
    logo: (state) => state.logo,
    icon: (state) => state.icon,
    headerDisabled: (state) => state.headerDisabled,
    footer: (state) => state.footer,
    footerDisabled: (state) => state.footerDisabled,
    supportedApps: (state) => state.supportedApps,
    defaults: (state) => state.defaults,
    vLayout: (state) => state.vLayout,
    isDark: (state) => state.isDark,
    colorTheme: (state) => state.colorTheme,
    colors: (state) => state.colors,
};