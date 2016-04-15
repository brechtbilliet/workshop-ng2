import {Reducer, Action} from "@ngrx/store";
import {INITIAL_STATE} from "../../state/initialState";
import {CollapsableSidebarContainerState} from "../../state/ContainersState";
export const collapsableSidebarReducer: Reducer<CollapsableSidebarContainerState> =
    (state: CollapsableSidebarContainerState = INITIAL_STATE.containers.collapsableSidebar,
     action: Action = null) => {
        return state;
    };