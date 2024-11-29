import { Event } from "./event"
import { User } from "./user"

export interface EventParticipant {
    eventId: number
    Event: Event
    userId: string
    User: User

}