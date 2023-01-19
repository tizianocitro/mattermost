import React from 'react';
import {Store, Action} from 'redux';
import {GlobalState} from 'mattermost-redux/types/store';
import {FormattedMessage} from 'react-intl';

import Root from './components/root';
import RHSView from './components/right_hand_sidebar';
import UserActions from './components/user_actions';
import CustomRoute from './components/custom_route';
import LeftSidebarHeader from './components/left_sidebar_header';
import UserAttributes from './components/user_attributes';
import LinkTooltip from './components/link_tooltip';

import {ChannelHeaderButtonIcon, MainMenuMobileIcon} from './components/icons';
import {
    mainMenuAction,
    channelHeaderMenuAction,
    postDropdownMenuAction,
    getStatus,
    websocketStatusChange,
} from './actions';

import reducer from './reducer';
import manifest, {id as pluginId} from './manifest';

// eslint-disable-next-line import/no-unresolved
import {PluginRegistry} from './types/mattermost-webapp';

export default class Plugin {
    public async initialize(registry: PluginRegistry, store: Store<GlobalState, Action<Record<string, unknown>>>) {
        registry.registerRootComponent(Root);
        registry.registerMainMenuAction(
            <FormattedMessage
                id='plugin.name'
                defaultMessage='Mattermost Plugin'
            />,
            () => store.dispatch(mainMenuAction()),
            <MainMenuMobileIcon/>,
        );
        registry.registerChannelHeaderMenuAction(
            <FormattedMessage
                id='plugin.name'
                defaultMessage='Mattermost Plugin'
            />,
            (channelId: any) => store.dispatch(channelHeaderMenuAction(channelId)),
            <MainMenuMobileIcon/>,
        );
        registry.registerPostDropdownMenuAction(
            <FormattedMessage
                id='plugin.name'
                defaultMessage='Mattermost Plugin'
            />,
            () => store.dispatch(postDropdownMenuAction()),
        );
        const {toggleRHSPlugin} = registry.registerRightHandSidebarComponent(
            RHSView,
            <FormattedMessage
                id='plugin.name'
                defaultMessage='Mattermost Plugin'
            />,
        );
        registry.registerChannelHeaderButtonAction(
            <ChannelHeaderButtonIcon/>,
            () => store.dispatch(toggleRHSPlugin),
            <FormattedMessage
                id='plugin.name'
                defaultMessage='Mattermost Plugin'
            />,
            <FormattedMessage
                id='plugin.name'
                defaultMessage='Mattermost Plugin'
            />,
        );
        registry.registerPopoverUserActionsComponent(UserActions);
        registry.registerPopoverUserAttributesComponent(UserAttributes);
        registry.registerLeftSidebarHeaderComponent(LeftSidebarHeader);
        registry.registerLinkTooltipComponent(LinkTooltip);
        registry.registerCustomRoute('/customroute', CustomRoute);
        registry.registerReducer(reducer);

        // Register an handler on websocket custom_mattermost-plugin_status_change event
        // For more events see SocketEvents enum at:
        // https://github.com/mattermost/mattermost-webapp/blob/master/utils/constants.tsx
        // Connects to ws://localhost:8065/api/v4/websocket
        registry.registerWebSocketEventHandler(
            'custom_' + pluginId + '_status_change',
            (message: any) => {
                store.dispatch(websocketStatusChange(message));
            },
        );

        // Immediately fetch the current plugin status
        store.dispatch(getStatus());

        // Fetch the current status whenever we recover an internet connection
        registry.registerReconnectHandler(() => {
            store.dispatch(getStatus());
        });
    }

    public uninitialize() {
        // eslint-disable-next-line no-console
        console.log(manifest.id + '::uninitialize()');
    }
}