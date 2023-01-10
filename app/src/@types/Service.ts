export type Services = Service[];

export interface Service {
    id:          number;
    position:    null;
    user_id:     number;
    group_id:    number;
    name:        string;
    subtitle:    string;
    appid:       string;
    icon:        string;
    logo:        string;
    url:         string;
    endpoint:    string;
    license:     string;
    description: string;
    enhanced:    number;
    type:        string;
    tag:         string;
}
