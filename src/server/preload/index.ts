import { IAnalyzeRequest } from "src/interfaces/analyze-request"
import { IElectronApi } from "src/interfaces/electron-api"

const { ipcRenderer } = require('electron/renderer')

const services: IElectronApi = {
	deleteDir: (param: string[]) => ipcRenderer.invoke('deleteDir', param),
	analyze: (param: IAnalyzeRequest) => ipcRenderer.invoke('analyze', param),
}

export default services