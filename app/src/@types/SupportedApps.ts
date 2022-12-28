export interface SupportedApps {
    appcount: number;
    apps:     App[];
}

export interface App {
    appid:           string;
    name:            string;
    website:         string;
    license:         string;
    description:     string;
    enhanced:        boolean;
    tile_background: TileBackground;
    icon:            string;
    sha:             string;
    config?:         Config;
}

export interface Config {
    type:                string;
    stat1:               Stat;
    stat2:               Stat;
    auth_payload?:       AuthPayload;
    stats?:              Stat[];
    additional_headers?: AdditionalHeaders;
}

export interface AdditionalHeaders {
    "OCS-APIRequest": string;
}

export interface AuthPayload {
    method: string;
    id:     number;
    params: string[];
}

export interface Stat {
    name:           string;
    url:            string;
    key:            null | string;
    filter:         string;
    updateOnChange: UpdateOnChange;
    suffix?:        string;
    filterBy?:      string;
    filterByValue?: string;
}

export enum UpdateOnChange {
    No = "No",
    UpdateOnChangeNo = "no",
    Yes = "Yes",
}

export enum TileBackground {
    Dark = "dark",
    Light = "light",
}
