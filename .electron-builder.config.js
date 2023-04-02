/**
 * @type {() => import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = async function () {
    const { getVersion } = await import("./version/getVersion.mjs")

    return {
        appId: "camp.swamp.electron",
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
            target: "flatpak",
            maintainer: "hello@swamp.camp",
            category: "Game",
        },
        flatpak: {},
    }
}
