import fs from 'fs/promises'
import { IAnalyzeRequest } from "src/interfaces/analyze-request"

export default async function analyze(ev: any, param: IAnalyzeRequest) {
	const blacklist = param.blacklist.split(", ")
	const toRemove = param.toRemove.split(", ")
	const MAIN_ROOT_DIR = param.dir

	const toRemoveDir: Record<string, string[]> = {}
	
	async function scans(rootDir: string, dirs: string[] = [], index: number = 0) {
		const dir = dirs[index]
		if(dir) {	
			const path = `${rootDir}/${dir}`
			const stat = await fs.stat(path)
			if(stat.isDirectory()) {
				if(toRemove.find((r) => dir.includes(r))) {
					if(!toRemoveDir[dir]) toRemoveDir[dir] = []
					toRemoveDir[dir].push(`${rootDir}/${dir}`)
				}
				if(blacklist.includes(dir)) {
					return (await scans(rootDir, dirs, index + 1))
				}
	
				const files = await fs.readdir(path)
				if(files.length) {
					return (await scans(`${rootDir}/${dir}`, files, 0))
				} else {
					return (await scans(rootDir, dirs, index + 1))
				}
			} else {
				return (await scans(rootDir, dirs, index + 1))
			}
		} else {
			if(rootDir === MAIN_ROOT_DIR) return
			const parentDir = rootDir.split("/").slice(0, -1).join("/")
			const parentDirs = await fs.readdir(parentDir)
			return (await scans(parentDir, parentDirs, parentDirs.indexOf(rootDir.split("/").pop()) + 1))
		}
	}

	const rootDir = MAIN_ROOT_DIR
	const dir = await fs.readdir(rootDir)
	
	await scans(rootDir, dir, 0)

	return {
		data: toRemoveDir,
		status: 200
	}
}