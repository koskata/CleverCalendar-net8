import { User } from "./user";
import { EventCategory } from "./eventCategory";

export interface Event {
    id: number
    name: string
    start: Date
    end: Date
    location: string
    userId: string
    user: User,
    categoryId: number,
    category: EventCategory
  }