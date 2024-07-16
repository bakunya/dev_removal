// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// Add this to the end of the existing file

import services from "./server/preload"
const { contextBridge } = require('electron/renderer')

contextBridge.exposeInMainWorld('electronApi', services)