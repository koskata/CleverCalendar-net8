import { Event } from "./event"

export interface EventCategory {
    id: number,
    name: string,
    color: string,
    events?: Event[]
}