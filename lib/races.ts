import races from "../data/races.json"
import { Race } from "../types"

export const getRaceById = (id: string): Race =>
  races.find(race => race.id === id)
