import {ReactNode, ElementType} from 'react';

import {id as pluginId} from './manifest';

const createActionType = (suffix: string): string => {
    return pluginId + suffix;
};

export const STATUS_CHANGE: string = createActionType('_status_change');
export const OPEN_ROOT_MODAL: string = createActionType('_open_root_modal');
export const CLOSE_ROOT_MODAL: string = createActionType('_close_root_modal');
export const SUBMENU: string = createActionType('_submenu');

export type AnyAction = any
export type WebSocketEventHandler = (message: any) => void
export type ReconnectEventHandler = () => void
export type Node = ReactNode | ElementType | JSX.Element | string
export type Element = Node | any

export interface StatusChangeAction {
    type: string,
    data: boolean,
}

export interface RootModalVisibleAction {
    type: string,
}

export interface SubMenuAction {
    type: string,
    subMenu: Node,
}
