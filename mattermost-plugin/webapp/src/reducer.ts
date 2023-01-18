import {CombinedState, combineReducers, Reducer} from 'redux';

import * as actionTypes from 'action_types';

type AnyState = any;
export type CombinedReducer = Reducer<CombinedState<AnyState>, actionTypes.AnyAction> | any

const enabled = (state = false, action: actionTypes.StatusChangeAction): boolean => {
    switch (action.type) {
    case actionTypes.STATUS_CHANGE:
        return action.data;
    default:
        return state;
    }
};

const rootModalVisible = (state = false, action: actionTypes.RootModalVisibleAction): boolean => {
    switch (action.type) {
    case actionTypes.OPEN_ROOT_MODAL:
        return true;
    case actionTypes.CLOSE_ROOT_MODAL:
        return false;
    default:
        return state;
    }
};

const subMenu = (state = '', action: actionTypes.SubMenuAction): actionTypes.Element => {
    switch (action.type) {
    case actionTypes.SUBMENU:
        return action.subMenu;
    default:
        return state;
    }
};

export default combineReducers({
    enabled,
    rootModalVisible,
    subMenu,
});

