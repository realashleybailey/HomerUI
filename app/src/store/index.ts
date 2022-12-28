import { createStore, createLogger } from 'vuex';
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})


import { store as services, ServicesStore, State as ServicesState } from './modules/services'
import { store as authentication, AuthenticationStore, State as AuthenticationState } from './modules/authentication'
import { store as settings, SettingsStore, State as SettingsState } from './modules/settings'
import { store as groups, GroupsStore, State as GroupsState } from './modules/groups'
import { store as queue, QueueStore, State as QueueState } from './modules/queue'

export type RootState = {
    services: ServicesState,
    authentication: AuthenticationState,
    settings: SettingsState,
    groups: GroupsState,
    queue: QueueState,
};

export type Store = ServicesStore<Pick<RootState, 'services'>> 
                    & AuthenticationStore<Pick<RootState, 'authentication'>>
                    & SettingsStore<Pick<RootState, 'settings'>>
                    & GroupsStore<Pick<RootState, 'groups'>>
                    & QueueStore<Pick<RootState, 'queue'>>;

const debug = process.env.NODE_ENV !== 'production';
const plugins = debug ? [createLogger({})] : [];

plugins.push(vuexLocal.plugin)

export const store = createStore({
    // state() {
    //     return {
    //         token: null,
    //         user: null,
            // links: [
            //     {
            //         name: "Home",
            //         url: "/",
            //         icon: "fas fa-house",
            //         target: "_self",
            //     }
            // ],
    //         colors: {
    //             "light": {
    //                 "highlight-primary": "#3367d6",
    //                 "highlight-secondary": "#4285f4",
    //                 "highlight-hover": "#5a95f5",
    //                 "background": "#f5f5f5",
    //                 "card-background": "#ffffff",
    //                 "text": "#363636",
    //                 "text-header": "#ffffff",
    //                 "text-title": "#303030",
    //                 "text-subtitle": "#424242",
    //                 "card-shadow": "rgba(0, 0, 0, 0.1)",
    //                 "link": "#3273dc",
    //                 "link-hover": "#363636",
    //                 "background-image": ""
    //             },
    //             "dark": {
    //                 "highlight-primary": "#3367d6",
    //                 "highlight-secondary": "#4285f4",
    //                 "highlight-hover": "#5a95f5",
    //                 "background": "#131313",
    //                 "card-background": "#2b2b2b",
    //                 "text": "#eaeaea",
    //                 "text-header": "#ffffff",
    //                 "text-title": "#fafafa",
    //                 "text-subtitle": "#f5f5f5",
    //                 "card-shadow": "rgba(0, 0, 0, 0.4)",
    //                 "link": "#3273dc",
    //                 "link-hover": "#ffdd57",
    //                 "background-image": ""
    //             }
    //         },
    //         headerDisabled: false,
    //         logo: "",
    //         icon: "",
    //         title: "Homer V2",
    //         subtitle: "Dashboard",
    //         defaults: {
    //             layout: "columns",
    //             colorTheme: "auto",
    //         },
    //         colorTheme: 0,
    //         vLayout: true,
    //         footer: "Made with ❤️ by <a href='https://github.com/realashleybailey' target='_blank'>Ashley Bailey</a>",
    //         footerDisabled: false,
    //         // services: null,
    //         connectivityCheck: true,
    //         message: {
    //             title: "👋 Welcome !",
    //             content: "Welcome to Homer, the possibilities are endless. Feel free to have a look around!<br /> You can find more information on <a href='https://github.com/bastienwirtz/homer'>github.com/bastienwirtz/homer</a>",
    //             style: "is-dark",
    //             disabled: false,
    //         },
    //         socket: null,
    //         isDark: false,
    //         groups: [],
    //         supportedApps: [],
    //     }
    // },
    // mutations: {
    //     setSetting(state, { name, value }) {
    //         state[name] = value
    //     },
    //     setToken(state, token) {
    //         state.token = token
    //     },
    //     setUser(state, user) {
    //         state.user = user
    //     },
    //     setLinks(state, links) {
    //         state.links = links
    //     },
    //     setLink(state, link) {
    //         state.links.push(link)
    //     },
    //     removeLink(state, id) {
    //         state.links = state.links.filter(link => (link as any).id !== id)
    //     },
    //     setColors(state, colors) {
    //         state.colors = colors
    //     },
    //     setHeaderDisabled(state, headerDisabled) {
    //         state.headerDisabled = !!headerDisabled
    //     },
    //     setLogo(state, logo) {
    //         state.logo = logo
    //     },
    //     setIcon(state, icon) {
    //         state.icon = icon
    //     },
    //     setTitle(state, title) {
    //         state.title = title
    //     },
    //     setSubtitle(state, subtitle) {
    //         state.subtitle = subtitle
    //     },
    //     setDefaults(state, defaults) {
    //         state.defaults = defaults
    //     },
    //     setColorTheme(state, colorTheme) {
    //         state.colorTheme = colorTheme
    //     },
    //     setVLayout(state, vLayout) {
    //         state.vLayout = vLayout
    //     },
    //     setFooter(state, footer) {
    //         state.footer = footer
    //     },
    //     setFooterDisabled(state, footerDisabled) {
    //         state.footerDisabled = !!footerDisabled
    //     },
    //     // setServices(state, services) {
    //     //     state.services = services
    //     // },
    //     // addService(state, service) {
    //     //     state.services.push(service)
    //     // },
    //     // updateService(state, { id, service }) {
    //     //     const index = state.services.findIndex(s => s.id === id)
    //     //     state.services[index] = service
    //     // },
    //     // deleteService(state, id) {
    //     //     state.services = state.services.filter(s => s.id !== id)
    //     // },
    //     setConnectivityCheck(state, connectivityCheck) {
    //         state.connectivityCheck = connectivityCheck
    //     },
    //     setMessage(state, message) {
    //         state.message = message
    //     },
    //     setSocket(state, socket) {
    //         state.socket = socket
    //     },
    //     setDark(state, isDark) {
    //         state.isDark = isDark
    //     },
    //     setGroups(state, groups) {
    //         state.groups = groups
    //     },
    //     setSupportedApps(state, supportedApps) {
    //         state.supportedApps = supportedApps
    //     }
    // },
    // getters: {
    //     isLoggedIn(state) {
    //         return state.token !== null
    //     },
    //     user(state) {
    //         return state.user
    //     },
    //     links(state) {
    //         return state.links
    //     },
    //     colors(state) {
    //         return state.colors
    //     },
    //     headerDisabled(state) {
    //         return !!state.headerDisabled
    //     },
    //     logo(state) {
    //         return state.logo
    //     },
    //     icon(state) {
    //         return state.icon
    //     },
    //     title(state) {
    //         return state.title
    //     },
    //     subtitle(state) {
    //         return state.subtitle
    //     },
    //     defaults(state) {
    //         return state.defaults
    //     },
    //     colorTheme(state) {
    //         return state.colorTheme
    //     },
    //     vLayout(state) {
    //         return state.vLayout
    //     },
    //     footer(state) {
    //         return state.footer
    //     },
    //     footerDisabled(state) {
    //         return !!state.footerDisabled
    //     },
    //     // services(state) {
    //     //     return state.services
    //     // },
    //     connectivityCheck(state) {
    //         return state.connectivityCheck
    //     },
    //     message(state) {
    //         return state.message
    //     },
    //     socket(state) {
    //         return state.socket
    //     },
    //     isDark(state) {
    //         return state.isDark
    //     },
    //     groups(state) {
    //         return state.groups
    //     },
    //     supportedApps(state) {
    //         return state.supportedApps
    //     }
    // },
    // actions: {
    //     SOCKET_CONNECT: function (context, data) {
    //         console.log('Connected to websocket')
    //         context.commit('setSocket', data)
    //     },
    //     logout({ commit }) {
    //         commit('setToken', null)
    //         router.push('/')
    //     },
    //     async saveSettings({ commit }, settings) {

    //         // Split the settings object into individual settings
    //         const title = settings.title
    //         const subtitle = settings.subtitle
    //         const logo = settings.logo
    //         const headerDisabled = settings.headerDisabled

    //         const message = settings.message

    //         const footer = settings.footer
    //         const footerDisabled = settings.footerDisabled

    //         // Create an empty body object
    //         let body = {}

    //         // Add the settings to the body object if they are not null
    //         if (title !== null) (body.title = title)
    //         if (subtitle !== null) (body.subtitle = subtitle)
    //         if (logo !== null) (body.logo = logo)
    //         if (headerDisabled !== null) (body.headerDisabled = headerDisabled)

    //         if (message !== null) (body.message = message)

    //         if (footer !== null) (body.footer = footer)
    //         if (footerDisabled !== null) (body.footerDisabled = footerDisabled)


    //         // Set the settings if they are not null
    //         if (title !== null) commit('setTitle', title)
    //         if (subtitle !== null) commit('setSubtitle', subtitle)
    //         if (logo !== null) commit('setLogo', logo)
    //         if (headerDisabled !== null) commit('setHeaderDisabled', headerDisabled)

    //         if (message !== null) commit('setMessage', message)

    //         if (footer !== null) commit('setFooter', footer)
    //         if (footerDisabled !== null) commit('setFooterDisabled', footerDisabled)

    //         // Stringify the body object
    //         body = JSON.stringify(body)

    //         // Save the settings to the API using token authentication
    //         await fetch('/api/settings', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': this.state.token
    //             },
    //             body
    //         })
    //     },
    //     async getSettings({ commit }) {
    //         // Get the settings from the API using token authentication
    //         const response = await fetch('/api/settings', {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //         })

    //         // If the response is not ok, throw an error
    //         if (!response.ok) {
    //             throw new Error('Failed to get settings')
    //         }

    //         // Get the settings from the response
    //         const settings = await response.json()

    //         // Split the settings object into individual settings and set them if they are not null
    //         if (settings.title !== null || settings.title !== undefined) commit('setTitle', settings.title)
    //         if (settings.subtitle !== null || settings.subtitle !== undefined) commit('setSubtitle', settings.subtitle)
    //         if (settings.logo !== null || settings.logo !== undefined) commit('setLogo', settings.logo)

    //         if (settings.headerDisabled !== null || settings.headerDisabled !== undefined) commit('setHeaderDisabled', settings.headerDisabled)

    //         if (settings.message !== null || settings.message !== undefined) commit('setMessage', settings.message)

    //         if (settings.links !== null || settings.links !== undefined) commit('setLinks', settings.links)

    //         if (settings.footer !== null || settings.footer !== undefined) commit('setFooter', settings.footer)
    //         if (settings.footerDisabled !== null || settings.footerDisabled !== undefined) commit('setFooterDisabled', settings.footerDisabled)
    //     },
    //     async addLink({ commit }, link) {
    //         // Add the link to the API using token authentication
    //         const response = await fetch('/api/addlink', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': this.state.token
    //             },
    //             body: JSON.stringify(link)
    //         })

    //         // If the response is not ok, throw an error
    //         if (!response.ok) {
    //             throw new Error('Failed to add link')
    //         }

    //         // Get the link from the response
    //         const newLink = await response.json()

    //         // Add the link to the state
    //         commit('setLink', newLink)
    //     },
    //     async deleteLink({ commit }, link) {
    //         // Delete the link from the API using token authentication
    //         const response = await fetch('/api/deletelink', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': this.state.token
    //             },
    //             body: JSON.stringify(link)
    //         })

    //         // If the response is not ok, throw an error
    //         if (!response.ok) {
    //             throw new Error('Failed to delete link')
    //         }

    //         // Delete the link from the state
    //         commit('removeLink', link.id)
    //     },
    //     async loadServices({ commit }) {
    //         // Get the services from the API
    //         const response = await fetch('/api/services', {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //         })

    //         // If the response is not ok, throw an error
    //         if (!response.ok) {
    //             throw new Error('Failed to get services')
    //         }

    //         // Get the services from the response
    //         const services = await response.json()

    //         // Set the services in the state
    //         commit('setServices', services)
    //     },
    //     async checkToken({ commit, state }) {

    //         try {

    //             // Get the token from the state
    //             const jwtData = VueJwtDecode.decode(state.token);

    //             // Check if the token is expired
    //             if (jwtData.exp < Date.now() / 1000) {
    //                 commit('setToken', null)
    //                 router.push('/')
    //                 return false
    //             }

    //         } catch (e) {
    //             commit('setToken', null)
    //             router.push('/')
    //             return false
    //         }

    //     },
    //     async loadGroups({ commit }) {

    //         // Get the groups from the API using token authentication
    //         const response = await fetch('/api/groups', {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': this.state.token
    //             },
    //         })

    //         // If the response is not ok, throw an error
    //         if (!response.ok) {
    //             throw new Error('Failed to get groups')
    //         }

    //         // Get the groups from the response
    //         const groups = await response.json()

    //         // Set the groups in the state
    //         commit('setGroups', groups)
    //     },
    //     async loadSupportedApps({ commit }) {

    //         // Get the supported apps from the API
    //         const response = await fetch('/api/supportedapps', {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //         })

    //         // If the response is not ok, throw an error
    //         if (!response.ok) {
    //             throw new Error('Failed to get supported apps')
    //         }

    //         // Get the supported apps from the response
    //         let supportedApps = await response.json()

    //         // If the supported apps are null, set them to an empty array
    //         if (supportedApps.apps) supportedApps = supportedApps.apps

    //         // Set the supported apps in the state
    //         commit('setSupportedApps', supportedApps)
    //     },
    //     // async getServices({ state }) {
    //     //     // Get the services from the API using token authentication
    //     //     const response = await fetch('/api/service', {
    //     //         headers: {
    //     //             'Content-Type': 'application/json',
    //     //             'Authorization': state.token,
    //     //         },
    //     //     })

    //     //     // If the response is not ok, throw an error
    //     //     if (!response.ok) {
    //     //         throw new Error('Failed to get services')
    //     //     }

    //     //     // Get the services from the response
    //     //     const services = await response.json()

    //     //     // Return the services
    //     //     return services
    //     // },
    //     // async getService({ state }, id) {
    //     //     // Get the service from the API using token authentication
    //     //     const response = await fetch(`/api/services/${id}`, {
    //     //         headers: {
    //     //             'Content-Type': 'application/json',
    //     //             'Authorization': state.token,
    //     //         },
    //     //     })

    //     //     // If the response is not ok, throw an error
    //     //     if (!response.ok) {
    //     //         throw new Error('Failed to get service' + id)
    //     //     }

    //     //     // Get the service from the response
    //     //     const service = await response.json()

    //     //     // Return the service
    //     //     return service
    //     // },
    //     // async createService({ commit, state }, service) {
    //     //     // Create the service in the API using token authentication
    //     //     const response = await fetch('/api/createservice', {
    //     //         method: 'POST',
    //     //         headers: {
    //     //             'Content-Type': 'application/json',
    //     //             'Authorization': state.token,
    //     //         },
    //     //         body: service
    //     //     })

    //     //     // If the response is not ok, throw an error
    //     //     if (!response.ok) {
    //     //         throw new Error('Failed to create service')
    //     //     }

    //     //     // Add the service to the state
    //     //     commit('addService', service)

    //     //     // Return the service
    //     //     return service
    //     // },
    //     // async updateService({ commit, state }, { id, service }) {
    //     //     // Update the service in the API using token authentication
    //     //     const response = await fetch('/api/service/' + id, {
    //     //         method: 'PUT',
    //     //         headers: {
    //     //             'Content-Type': 'application/json',
    //     //             'Authorization': state.token,
    //     //         },
    //     //         body: service
    //     //     })

    //     //     // If the response is not ok, throw an error
    //     //     if (!response.ok) {
    //     //         throw new Error('Failed to update service')
    //     //     }

    //     //     // Update the service in the state
    //     //     commit('updateService', { id, service })

    //     //     // Return the service
    //     //     return service
    //     // },
    //     // async deleteService({ commit, state }, id) {
    //     //     // Delete the service from the API using token authentication
    //     //     const response = await fetch('/api/service/' + id, {
    //     //         method: 'DELETE',
    //     //         headers: {
    //     //             'Content-Type': 'application/json',
    //     //             'Authorization': state.token,
    //     //         }
    //     //     })

    //     //     // If the response is not ok, throw an error
    //     //     if (!response.ok) {
    //     //         throw new Error('Failed to delete service')
    //     //     }

    //     //     // Delete the service from the state
    //     //     commit('deleteService', id)
    //     // }
    // },
    plugins,
    modules: {
        services,
        authentication,
        settings,
        groups,
        queue,
    }
})

export function useStore(): Store {
    return store as Store;
}