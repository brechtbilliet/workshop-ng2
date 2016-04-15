import {Reducer, Action} from "@ngrx/store";
import {Wine} from "../../../stock/entities/Wine";
import {INITIAL_STATE} from "../../state/initialState";
export const winesReducer: Reducer<Array<Wine>> = (state: Array<Wine> = INITIAL_STATE.data.wines,
                                                   action: Action = null) => {
    return state;
};