import { ResponseError } from "../../utils/response-error"

export default async function deleteDir(param: string[]) {
	const response = await window.electronApi.deleteDir(param)
	const e = new ResponseError()

	if (response.status === 500) {
		e.message = 'Internal server error.'
		e.status = 500
		throw e
	}

	return response as { status: number }
}