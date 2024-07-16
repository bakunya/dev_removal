import { IAnalyzeRequest } from "src/interfaces/analyze-request"
import { ResponseError } from "../../utils/response-error"
import { IAnalyzeResponse } from "src/interfaces/analyze-response"

export default async function analyze(param: IAnalyzeRequest) {
	const response = await window.electronApi.analyze(param)
	const e = new ResponseError()

	if (response.status === 500) {
		e.message = 'Internal server error.'
		e.status = 500
		throw e
	}

	return response as IAnalyzeResponse
}