import { IAnalyzeRequest } from "./analyze-request";
import { IAnalyzeResponse } from "./analyze-response";

export interface IElectronApi {
	deleteDir: (param: string[]) => Promise<{ status: number }>
	analyze: (param: IAnalyzeRequest) => Promise<IAnalyzeResponse>
}