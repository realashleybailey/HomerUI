import { Services } from "./Service";

export type Groups = Group[];

export interface Group {
    id:      number;
    user_id: number;
    name:    string;
    icon:    string;
    items?:   Services;
}
