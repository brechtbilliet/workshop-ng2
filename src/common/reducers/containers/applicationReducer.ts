import {Reducer, Action} from "@ngrx/store";
import {INITIAL_STATE} from "../../state/initialState";
import {ApplicationContainerState} from "../../state/ContainersState";

export const applicationReducer: Reducer<ApplicationContainerState> =
    (state: ApplicationContainerState = INITIAL_STATE.containers.application, action: Action) => {
        return state;
    };