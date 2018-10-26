import { Action } from "overmind"
import * as mutations from "./mutations"
export const changeFoo: Action = action => action.mutate(mutations.changeFoo)
