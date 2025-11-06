# @superwindcloud/maker-nsis

An `electron-forge` maker for NSIS that supports `electron-forge` v6 and can be used as a replacement for `electron-builder`. Supports code-signing and basic updates with `electron-updater`. This is a community-maintained fork with additional features and improvements.

## Features

- Creates Windows installers using NSIS (Nullsoft Scriptable Install System)
- Supports code-signing for Windows applications
- Compatible with `electron-forge` v6
- Supports basic updates with `electron-updater`
- Cross-architecture support (x64, ia32, arm64)
- Enhanced configuration options
- Active community support

## Installation

```bash
npm install --save-dev @superwindcloud/maker-nsis
```

## Configuration

To use this maker, add it to your `electron-forge` configuration in `package.json`:

```json
{
  "config": {
    "forge": {
      "packagerConfig": {},
      "makers": [
        {
          "name": "@superwindcloud/maker-nsis",
          "config": {
            // Optional: Code signing configuration
            "codesign": {
              "certificateFile": "./path/to/certificate.p12",
              "certificatePassword": "your-certificate-password",
              "signingHashAlgorithms": ["sha256"],
              "timestampServer": "http://timestamp.digicert.com"
            },
            // Optional: Auto-updater configuration
            "updater": {
              "url": "https://your-update-server.com",
              "channel": "latest",
              "publisherName": ["Your Company Name"]
            },
            // Optional: Additional app-builder-lib configuration
            "getAppBuilderConfig": async () => {
              return {
                // Additional app-builder-lib configuration
                "productName": "My App",
                "artifactName": "${productName}-Setup-${version}.${ext}",
                "compression": "maximum",
                "oneClick": false,
                "allowToChangeInstallationDirectory": true
              };
            }
          }
        }
      ]
    }
  }
}
```

## Configuration Options

### Code Signing Options
- `codesign`: Configuration object for Windows code signing
  - `certificateFile`: Path to the signing certificate file
  - `certificatePassword`: Password for the certificate file
  - `signingHashAlgorithms`: Array of hash algorithms to use for signing (e.g., ["sha256"])
  - `timestampServer`: URL for the timestamp server

### Auto-updater Options
- `updater`: Configuration object for electron-updater compatibility
  - `url`: Base URL for update files
  - `channel`: Update channel (default: "latest")
  - `publisherName`: Array of publisher names for the app-update.yml file
  - `updaterCacheDirName`: Optional cache directory name for updates

### Advanced Configuration
- `getAppBuilderConfig`: Async function that returns additional configuration for app-builder-lib

## Usage

Once configured, you can build your installer with:

```bash
npm run make
```

This will generate a Windows NSIS installer in the `out/make` directory.

## Code Signing

To properly sign your Windows application:

1. Obtain a valid code signing certificate from a trusted Certificate Authority
2. Configure the `codesign` option with the path to your certificate file and its password
3. Run the make command - your application will be automatically signed during the build process

## Auto-updater Support

This maker includes built-in support for `electron-updater`:

1. Configure the `updater` option with your update server URL
2. Include `electron-updater` in your application dependencies
3. Publish your updates to the specified URL
4. The installer will include an `app-update.yml` file that `electron-updater` will use

## Development

To build the maker from source:

```bash
npm run build
```

To lint the source code:

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## Requirements

- Node.js >= 20.0.0
- Windows platform for building (for code signing and NSIS compilation)

## License

MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgements

This package is a community-maintained fork of the original electron-forge maker-nsis functionality with additional features and improvements.