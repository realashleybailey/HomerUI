import { createStore, createLogger } from 'vuex';
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

import { state } from './state'
import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'

import { store as services, ServicesStore, State as ServicesState } from './modules/services'
import { store as authentication, AuthenticationStore, State as AuthenticationState } from './modules/authentication'
import { store as settings, SettingsStore, State as SettingsState } from './modules/settings'
import { store as groups, GroupsStore, State as GroupsState } from './modules/groups'
import { store as links, LinksStore, State as LinksState } from './modules/links'
import { store as messages, MessagesStore, State as MessagesState } from './modules/messages'
import { store as queue, QueueStore, State as QueueState } from './modules/queue'

export type RootState = {
    services: ServicesState,
    authentication: AuthenticationState,
    settings: SettingsState,
    groups: GroupsState,
    links: LinksState,
    messages: MessagesState,
    queue: QueueState,
};

export type Store = ServicesStore<Pick<RootState, 'services'>> 
                    & AuthenticationStore<Pick<RootState, 'authentication'>>
                    & SettingsStore<Pick<RootState, 'settings'>>
                    & GroupsStore<Pick<RootState, 'groups'>>
                    & LinksStore<Pick<RootState, 'links'>>
                    & MessagesStore<Pick<RootState, 'messages'>>
                    & QueueStore<Pick<RootState, 'queue'>>;

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

plugins.push(vuexLocal.plugin)

export const store = createStore({
    state: state as RootState & any,
    actions,
    mutations,
    getters,
    plugins,
    modules: {
        services,
        authentication,
        settings,
        groups,
        links,
        messages,
        queue,
    },
    strict: process.env.NODE_ENV !== 'production'
})

export function useStore(): Store {
    return store as Store;
}