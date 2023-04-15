const PACKAGE_NAME = "camp.swamp.game"

/**
 * @type {() => import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = async function () {
    const { getVersion } = await import("./version/getVersion.mjs")

    return {
        appId: PACKAGE_NAME,
        productName: "SWAMP CAMP",
        directories: {
            output: "dist",
            buildResources: "buildResources",
        },
        files: ["packages/**/dist/**"],
        extraMetadata: {
            version: getVersion(),
        },
        linux: {
            artifactName: `SWAMP-CAMP-\${version}.\${ext}`,
            target: "flatpak",
            maintainer: "hello@swamp.camp",
            category: "Game",
        },
        flatpak: {
            finishArgs: [
                // Read/write home directory access
                "--filesystem=home",
                // Allow communication with network
                "--share=network",
                // Access the windowing system
                "--socket=wayland",
                "--socket=fallback-x11",
                // Audio
                "--socket=pulseaudio",
                // GPU acceleration
                "--device=dri",
                // Unfortunately, the only way to get gamepad access is with device=all :(
                // https://github.com/flatpak/flatpak/issues/7
                "--device=all",
            ],
            runtimeVersion: "22.08",
            branch: "main",
            files: [
                [".flatpak-appdata.xml", `/share/metainfo/${PACKAGE_NAME}.metainfo.xml`],
                [
                    "buildResources/icon.png",
                    `/share/icons/hicolor/512x512/apps/${PACKAGE_NAME}.png`,
                ],
            ],
        },
    }
}
