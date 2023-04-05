import { ipcRenderer } from "electron"

document.addEventListener("swamp-camp-quit", () => {
    ipcRenderer.invoke("quit-app")
})
