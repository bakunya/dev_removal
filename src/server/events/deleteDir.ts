import fs from 'fs/promises'

export default async function deleteDir(ev: any, param: string[]) {
	for(const dir of param) {
		await fs.rm(dir, { recursive: true, force: true })
	}
	return { status: 200 }
}