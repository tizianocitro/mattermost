import Plugin from './plugin';

import manifest from './manifest';

declare global {
    interface Window {
        WebappUtils: any,
        registerPlugin(id: string, plugin: Plugin): void
    }
}

window.registerPlugin(manifest.id, new Plugin());
