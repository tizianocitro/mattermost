# Mattermost Plugin
This plugin serves as a first approiach to Mattermost plugin.

More on plugins: [plugin documentation](https://developers.mattermost.com/extend/plugins/).

## Getting Started
Create a new plugin from scratch:
```
git clone --depth 1 https://github.com/mattermost/mattermost-plugin-starter-template com.example.plugin
```
Replace `com.example.plugin` with the name you want for your plugin.

Edit the following files:
1. `plugin.json` with your `id`, `name`, and `description`:
```
{
    "id": "com.example.plugin",
    "name": "Example Plugin",
    "description": "An exmaple plugin."
}
```

2. `go.mod` with your Go module path, following the `<hosting-site>/<repository>/<module>` convention:
```
module github.com/tizianocitro/plugin
```

3. `.golangci.yml` with your Go module path:
```yml
linters-settings:
  # [...]
  goimports:
    local-prefixes: github.com/tizianocitro/plugin
```

Build the plugin:
```
make
```

This will produce a single plugin file - with support for multiple architectures - for upload to the Mattermost server:

```
dist/com.example.plugin.tar.gz
```

## Development

To avoid having to manually install the plugin, build and deploy it using one of the following options. In order for the below options to work, enable plugin uploads via config.json or API and restart the Mattermost server.

```json
    "PluginSettings" : {
        ...
        "EnableUploads" : true
    }
```

### Deploying with Local Mode

If the Mattermost server is running locally, it is possible to enable [local mode](https://docs.mattermost.com/administration/mmctl-cli-tool.html#local-mode) to streamline deploying the plugin. Edit the server configuration as follows:

```json
{
    "ServiceSettings": {
        ...
        "EnableLocalMode": true,
        "LocalModeSocketLocation": "/var/tmp/mattermost_local.socket"
    },
}
```

and then deploy the plugin:
```
make deploy
```

The Unix socket path can be customized:
```
export MM_LOCALSOCKETPATH=/var/tmp/alternate_local.socket
make deploy
```

If developing a plugin with a webapp, watch for changes and deploy those automatically:
```
export MM_SERVICESETTINGS_SITEURL=http://localhost:8065
export MM_ADMIN_TOKEN=access-token
make watch
```

### Deploying with credentials

Alternatively, authenticate with the server's API with credentials:
```
export MM_SERVICESETTINGS_SITEURL=http://localhost:8065
export MM_ADMIN_USERNAME=username
export MM_ADMIN_PASSWORD=password
make deploy
```

or with a [personal access token](https://docs.mattermost.com/developer/personal-access-tokens.html):
```
export MM_SERVICESETTINGS_SITEURL=http://localhost:8065
export MM_ADMIN_TOKEN=personal-access-token
make deploy
```

## Make a server-only or web app-only plugin

Delete the `server` or `webapp` folders and remove the corresponding sections from `plugin.json`. The build scripts will skip the missing portions automatically.

### How to include assets in the plugin bundle

Place them into the `assets` directory. To use an asset at runtime, build the path to the asset and open as a regular file:

```go
bundlePath, err := p.API.GetBundlePath()
if err != nil {
    return errors.Wrap(err, "failed to get bundle path")
}

image, err := ioutil.ReadFile(filepath.Join(bundlePath, "assets", "image.png"))
if err != nil {
    return errors.Wrap(err, "failed to read image")
}

if appErr := p.API.SetProfileImage(userID, image); appErr != nil {
    return errors.Wrap(err, "failed to set image")
}
```

### Build the plugin with unminified JS
Setting the `MM_DEBUG` environment variable will invoke the debug builds. The simplist way to do this is to simply include this variable in calls to `make` (e.g. `make dist MM_DEBUG=1`).
