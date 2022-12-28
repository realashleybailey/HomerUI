export interface Service {
    id: number;
    group_id: number;
    user_id: number;
    name: string;
    subtitle: string;
    appid: string;
    icon: string | null;
    logo: string;
    url: string;
    endpoint: string | null;
    license: string;
    description: string;
    enhanced: number;
    type: string;
    tag: string;
}