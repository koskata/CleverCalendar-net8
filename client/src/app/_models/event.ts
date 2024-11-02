import { User } from "./user"

export interface Event {
    id: number
    name: string
    start: Date
    end: Date
    location: string
    userId: string
    user: User
  }