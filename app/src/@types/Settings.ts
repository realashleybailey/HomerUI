import { Links } from "./Links";
import { Message } from "./Message";

export interface Settings {
    title:          string;
    subtitle:       string;
    logo:           string;
    headerDisabled: number;
    footer:         string;
    footerDisabled: number;
    links:          Links;
    message:        Message;
}