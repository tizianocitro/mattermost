import {ElementType} from 'react';

import {CombinedReducer} from 'reducer';

import {AnyAction, WebSocketEventHandler, Element} from 'action_types';

export interface PluginRegistry {
    registerRootComponent(component: ElementType)
    registerRightHandSidebarComponent(component: ElementType, title: Element)
    registerChannelHeaderButtonAction(icon: Element, action: AnyAction, dropdownText: Element, tooltipText: Element)
    registerChannelHeaderMenuAction(text: Element, action: AnyAction, shouldRender: Element)
    registerMainMenuAction(text: Element, action: AnyAction, mobileIcon: Element)
    registerPopoverUserActionsComponent(component: ElementType)
    registerPostDropdownMenuAction(text: Element, action: AnyAction, filter = false)
    registerLeftSidebarHeaderComponent(component: ElementType)
    registerCustomRoute(route: string, component: ElementType)
    registerWebSocketEventHandler(event: string, handler: WebSocketEventHandler)
    registerReconnectHandler(handler: ReconnectEventHandler)
    registerReducer(reducer: CombinedReducer)

    // Add more if needed from https://developers.mattermost.com/extend/plugins/webapp/reference
}
