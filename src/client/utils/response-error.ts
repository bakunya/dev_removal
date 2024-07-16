export class ResponseError extends Error {
	status: number
	constructor(message?: string, status?: number) {
		if (message) {
			super(message)
		} else {
			super()
		}

		if(status) {
			this.status = status
		}
	}
}