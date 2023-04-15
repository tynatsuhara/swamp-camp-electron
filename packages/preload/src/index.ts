import { ipcRenderer } from "electron"

// These should have corresponding entries in main/index.ts

document.addEventListener("swamp-camp-quit", () => {
    ipcRenderer.invoke("quit-app")
})

document.addEventListener("swamp-camp-open-devtools", () => {
    ipcRenderer.invoke("open-devtools")
})
