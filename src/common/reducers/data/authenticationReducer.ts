import {Reducer, Action} from "@ngrx/store";
import {INITIAL_STATE} from "../../state/initialState";
import {AuthenticationDataState} from "../../state/DataState";
export const authenticationReducer: Reducer<AuthenticationDataState> =
    (state: AuthenticationDataState = INITIAL_STATE.data.authentication,
     action: Action = null) => {
        return state;
    }
