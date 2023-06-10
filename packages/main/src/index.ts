import { app, globalShortcut, ipcMain } from "electron"
import { platform } from "node:process"
import "./security-restrictions"
import { getWindow, restoreOrCreateWindow } from "/@/mainWindow"

/**
 * Prevent electron from running multiple instances.
 */
const isSingleInstance = app.requestSingleInstanceLock()
if (!isSingleInstance) {
    app.quit()
    process.exit(0)
}
app.on("second-instance", restoreOrCreateWindow)

app.setName("SWAMP CAMP")

if (process.env.MODE !== "development") {
    const disabledShortcuts = [
        // prevent reloading
        "CommandOrControl+Shift+R",
        "CommandOrControl+R",
        "F5",
    ]
    app.on("browser-window-focus", () => {
        disabledShortcuts.forEach((shortcut) => {
            globalShortcut.register(shortcut, () => {
                console.log(`${shortcut} is pressed: Shortcut Disabled`)
            })
        })
    })
    app.on("browser-window-blur", () => {
        disabledShortcuts.forEach((shortcut) => globalShortcut.unregister(shortcut))
    })
}

/**
 * Shout down background process if all windows was closed
 */
app.on("window-all-closed", () => {
    if (platform !== "darwin") {
        app.quit()
    }
})

/**
 * @see https://www.electronjs.org/docs/latest/api/app#event-activate-macos Event: 'activate'.
 */
app.on("activate", restoreOrCreateWindow)

/**
 * Create the application window when the background process is ready.
 */
app.whenReady()
    .then(restoreOrCreateWindow)
    .catch((e) => console.error("Failed create window:", e))

/**
 * Check for app updates, install it in background and notify user that new version was installed.
 * No reason run this in non-production build.
 * @see https://www.electron.build/auto-update.html#quick-setup-guide
 *
 * Note: It may throw "ENOENT: no such file app-update.yml"
 * if you compile production app without publishing it to distribution server.
 * Like `npm run compile` does. It's ok 😅
 */
if (import.meta.env.PROD) {
    app.whenReady()
        .then(() => import("electron-updater"))
        .then((module) => {
            const autoUpdater =
                module.autoUpdater ||
                // @ts-expect-error Hotfix for https://github.com/electron-userland/electron-builder/issues/7338
                (module.default.autoUpdater as (typeof module)["autoUpdater"])
            return autoUpdater.checkForUpdatesAndNotify()
        })
        .catch((e) => console.error("Failed check and install updates:", e))
}

// These should have corresponding entries in preload/index.ts

ipcMain.handle("quit-app", () => app.quit())

ipcMain.handle("open-devtools", () =>
    getWindow().then((win) => win.webContents.openDevTools({ mode: "right" }))
)
