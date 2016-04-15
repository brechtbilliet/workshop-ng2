import {Reducer, Action} from "@ngrx/store";
import {INITIAL_STATE} from "../../state/initialState";
import {EditStockContainerState} from "../../state/ContainersState";
export const editStockReducer: Reducer<EditStockContainerState> = (state: EditStockContainerState = INITIAL_STATE.containers.editStockPage,
                                                                  action: Action = null) => {
    return state;
};