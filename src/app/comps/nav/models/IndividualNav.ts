import { SchemeHistory } from "./SchemeHistory"

export interface IndividualNav {
    fundId: string
    fundName: string
    schemeId: string
    schemeName: string
    schemeHistory: SchemeHistory[]
  }