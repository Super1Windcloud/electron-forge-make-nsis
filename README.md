# electron-forge-make-nsis

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
npm install --save-dev electron-forge-make-nsis
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
          "name": "electron-forge-make-nsis",
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

For a more comprehensive configuration that includes multiple architectures and advanced options:

```json
{
  "config": {
    "forge": {
      "packagerConfig": {},
      "makers": [
        {
          "name": "electron-forge-make-nsis",
          "platforms": ["win32"],
          "config": {
            "artifactName": "${productName}-Setup-${version}-${arch}.${ext}",
            "overwrite": true,
            "perMachine": false,
            "oneClick": true,
            "allowElevation": true,
            "allowToChangeInstallationDirectory": false,
            "createDesktopShortcut": true,
            "createStartMenuShortcut": true,
            "shortcutName": "${productName}",
            "include": "resources/installer.nsh",
            "warningsAsErrors": true,
            "multiLanguageInstaller": true,
            "differentialPackage": true,
            "codesign": {
              "certificateFile": "./certs/code-signing.p12",
              "certificatePassword": "${WIN_CODE_SIGNING_PASS}",
              "signingHashAlgorithms": ["sha256"],
              "timestampServer": "http://timestamp.digicert.com"
            },
            "updater": {
              "url": "https://your-update-server.com/download",
              "channel": "latest",
              "publisherName": ["Your Company Name"]
            },
            "getAppBuilderConfig": async (arch) => {
              return {
                "productName": "My Application",
                "copyright": "Copyright © 2025 Your Company",
                "icon": "resources/icon.ico",
                "appId": "com.yourcompany.myapp",
                "artifactName": "${productName}-Setup-${version}-${arch}.${ext}",
                "compression": "maximum",
                "oneClick": false,
                "allowToChangeInstallationDirectory": true,
                "publish": {
                  "provider": "generic",
                  "url": "https://your-update-server.com/download"
                }
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

### Basic NSIS Options
- `artifactName`: The name of the produced executable file, defaults to `${productName} Setup ${version}.${ext}`
- `overwrite`: Whether to overwrite an existing installer, defaults to `false`
- `perMachine`: Whether to install per-machine or per-user, defaults to `false` (per-user)
- `oneClick`: Whether to create a one-click installer, defaults to `true`
- `allowElevation`: Whether to allow the installer to elevate for installation, defaults to `true`
- `allowToChangeInstallationDirectory`: Whether the user can change the installation directory, defaults to `false`
- `createDesktopShortcut`: Whether to create a desktop shortcut, defaults to `true`
- `createStartMenuShortcut`: Whether to create a start menu shortcut, defaults to `true`
- `shortcutName`: Name of the created shortcuts, defaults to `${productName}`
- `include`: Path to an NSIS script to include in the installer
- `warningsAsErrors`: Whether to treat NSIS warnings as errors, defaults to `true`
- `multiLanguageInstaller`: Whether to create a multi-language installer, defaults to `true`
- `differentialPackage`: Whether to create differential packages for updates, defaults to `true`

### Code Signing Options
- `codesign`: Configuration object for Windows code signing
  - `certificateFile`: Path to the signing certificate file
  - `certificatePassword`: Password for the certificate file (can use environment variables)
  - `signingHashAlgorithms`: Array of hash algorithms to use for signing (e.g., ["sha256"])
  - `timestampServer`: URL for the timestamp server

### Auto-updater Options
- `updater`: Configuration object for electron-updater compatibility
  - `url`: Base URL for update files
  - `channel`: Update channel (default: "latest")
  - `publisherName`: Array of publisher names for the app-update.yml file
  - `updaterCacheDirName`: Optional cache directory name for updates

### Advanced Configuration
- `getAppBuilderConfig`: Async function that returns additional configuration for app-builder-lib. Can be used to dynamically set different options based on architecture.

## Usage

Once configured, you can build your installer with:

```bash
npm run make
```

This will generate a Windows NSIS installer in the `out/make` directory.

For a specific architecture:

```bash
npm run make -- --arch=arm64
```

Or using npx:

```bash
npx electron-forge make --arch=x64
```

## Code Signing

To properly sign your Windows application:

1. Obtain a valid code signing certificate from a trusted Certificate Authority
2. Store your certificate in a secure location (e.g., `certs/code-signing.p12`)
3. Configure the `codesign` option with the path to your certificate file and its password
4. Consider using environment variables for sensitive information:

```json
{
  "codesign": {
    "certificateFile": "./certs/code-signing.p12",
    "certificatePassword": "${WIN_CODE_SIGNING_PASS}"
  }
}
```

5. Run the make command - your application will be automatically signed during the build process

## Auto-updater Support

This maker includes built-in support for `electron-updater`:

1. Configure the `updater` option with your update server URL
2. Include `electron-updater` in your application dependencies:

```bash
npm install electron-updater
```

3. In your Electron application, implement update logic like:

```javascript
const { autoUpdater } = require("electron-updater");

autoUpdater.checkForUpdatesAndNotify();
```

4. Publish your updates to the specified URL
5. The installer will include an `app-update.yml` file that `electron-updater` will use

## Development

To build the maker from source:

```bash
npm run build
```

To lint the source code:

```bash
npm run lint
```

To run tests:

```bash
npm test
```

## Troubleshooting

### Common Issues and Solutions

**Error: "NSIS not found"**

Solution: Make sure NSIS is installed on your system and available in PATH. You can download it from the [official NSIS website](https://nsis.sourceforge.io/Download).

**Error: "Code signing failed"**

Solution: 
1. Verify that your certificate file path is correct
2. Check that the certificate password is correct
3. Ensure you have the necessary permissions to access the certificate file
4. Make sure the Windows SDK is installed if using Windows

**Installer fails to run on target machine**

Solution:
1. Check that the target machine meets the application requirements
2. If using code signing, verify certificates are properly configured
3. Ensure all required dependencies are included in your application

**"Access is denied" during installation**

Solution: This is often related to user account control (UAC). Consider setting `perMachine` to `false` to install per-user instead of per-machine.

**Long installation times**

Solution: Review your compression settings. Try using "store" compression for faster builds during development, but switch to "maximum" for production releases.

### Verbose Logging

To get more detailed output during the build process:

```bash
DEBUG=electron-forge:* npm run make
```

## FAQ

**Q: Can I use this with electron-builder instead of electron-forge?**
A: No, this package is specifically designed for electron-forge. For electron-builder, use the built-in NSIS target.

**Q: Does this support macOS or Linux?**
A: No, this is specifically for creating Windows installers using NSIS. For cross-platform installers, you'll need different tools for each platform.

**Q: How do I customize the installer UI?**
A: You can provide a custom NSIS script using the `include` option to customize the installer interface and behavior.

**Q: Can I create installers for multiple architectures in one command?**
A: Yes, by default electron-forge will create installers for all specified architectures. You can also target specific architectures with the `--arch` flag.

**Q: What's the difference between this and the original maker-nsis?**
A: This is a community-maintained fork with additional features like improved code signing support, auto-updater integration, and enhanced configuration options.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## Requirements

- Node.js >= 20.0.0
- Windows platform for building (for code signing and NSIS compilation)
- NSIS installed on your system for generating installers

## License

MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgements

This package is a community-maintained fork of the original electron-forge maker-nsis functionality with additional features and improvements.