import {Dispatch} from 'redux';
import {getConfig} from 'mattermost-redux/selectors/entities/general';

import {id as pluginId} from './manifest';

import {STATUS_CHANGE, OPEN_ROOT_MODAL, CLOSE_ROOT_MODAL, SUBMENU, AnyAction} from './action_types';

export const openRootModal: AnyAction = (subMenu = '') => (dispatch: Dispatch): void => {
    dispatch({
        type: SUBMENU,
        subMenu,
    });
    dispatch({
        type: OPEN_ROOT_MODAL,
    });
};

export const closeRootModal: AnyAction = () => (dispatch: Dispatch): void => {
    dispatch({
        type: CLOSE_ROOT_MODAL,
    });
};

export const mainMenuAction: AnyAction = openRootModal;
export const channelHeaderMenuAction: AnyAction = openRootModal;
export const postDropdownMenuAction: AnyAction = openRootModal;

// export const fileUploadMethodAction: any = openRootModal;
// export const postDropdownSubMenuAction: any = openRootModal;
// export const fileDropdownMenuAction: any = openRootModal;

export const getPluginServerRoute = (state: any): string => {
    const config = getConfig(state);

    let basePath = '/';
    if (config && config.SiteURL) {
        basePath = new URL(config.SiteURL).pathname;

        if (basePath && basePath[basePath.length - 1] === '/') {
            basePath = basePath.substr(0, basePath.length - 1);
        }
    }

    return basePath + '/plugins/' + pluginId;
};

export const getStatus: AnyAction = () => async (dispatch: Dispatch, getState: any): Promise<void> => {
    const endpoint = getPluginServerRoute(getState()) + '/status';
    fetch(endpoint)
        .then((response) => response.json())
        .then((response) => {
            dispatch({
                type: STATUS_CHANGE,
                data: response.enabled,
            });
        });
};

export const websocketStatusChange: AnyAction = (message: any) => (dispatch: Dispatch): void => {
    dispatch({
        type: STATUS_CHANGE,
        data: message.data.enabled,
    });
};
