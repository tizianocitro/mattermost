import {id as pluginId} from './manifest';

const PLUGIN_PREFIX = 'plugins-';

// The state here is whatever I'm receveing in the index.ts of each component
const getPluginState = (state: any) => state[PLUGIN_PREFIX + pluginId] || {};

export const isEnabled = (state: any) => getPluginState(state).enabled;

export const isRootModalVisible = (state: any) => getPluginState(state).rootModalVisible;

export const subMenu = (state: any) => getPluginState(state).subMenu;
