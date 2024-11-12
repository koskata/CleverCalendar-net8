import { Event } from "./event"

export interface EventCategory {
    id: number,
    name: string,
    color: string,
    emoticon: string,
    events?: Event[]
}