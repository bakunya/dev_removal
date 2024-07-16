import { Button, Dialog, DialogPanel } from "@headlessui/react"
import { FormEvent, useState } from "react"
import analyze from "../adapters/ipc/analyze"
import useAnalyzeResult from "../store/analyze-result"
// @ts-ignore
import x from '../assets/miku.gif'

const blacklist = "node_modules, .git, .vscode, .idea, .DS_Store, .gitignore, build, dist, asset, assets, css, js, vendor, public, src, My Music, My CamStudio Temp Files, My CamStudio Videos, My Music, My Palettes, My Pictures, My Videos, My Web Sites, .next, debug, target, env, Lib, pip, app, .vite, cache"
const toRemove = "node_modules, vendor, build, dist, .next, .vite, cache"
const rootDir = "C:/Users/bakunya/Documents"

export default function ScanButton() {
	const fill = useAnalyzeResult(s => s.fill)
	const [isLoading, setIsLoading] = useState(false)
	const [isOpen, setIsOpen] = useState(true)

	function open() {
		setIsOpen(true)
	}

	function close() {
		if(isLoading) return
		setIsOpen(false)
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()
		
		setIsLoading(true)
		const formData = new FormData(e.target as HTMLFormElement)
		const dir = formData.get("dir") as string
		const blacklist = formData.get("blacklist") as string
		const toRemove = formData.get("toRemove") as string

		try {
			const res = await analyze({ dir, blacklist, toRemove })
			if(res.data) {
				fill(res.data)
				setIsOpen(false)
			}
		} catch (err) {
			console.log(err)	
		} finally {
			setIsLoading(false)
		}
	}


	return (
		<>
			<button
				onClick={open}
				type="button"
				className="inline-flex items-center rounded-md bg-third px-3 py-2 text-sm font-semibold text-white shadow-sm"
			>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={ 1.5 } stroke="currentColor" className="size-6">
					<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
				</svg>
				<span className="ml-2">Scan</span>
			</button>
			<Dialog open={ isOpen } as="div" className="relative z-10 focus:outline-none" onClose={ close }>
				<div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-third/50">
					<div className="flex min-h-full items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							{ !isLoading
								? (
									<form className="flex flex-col gap-3" onSubmit={handleSubmit}>
										<div>
											<label htmlFor="dir" className="block text-sm font-medium leading-6 text-gray-900">
												Root Dir
											</label>
											<div className="relative mt-2 rounded-md shadow-sm">
												<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
													<span className="text-gray-500 sm:text-sm">
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
															<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
														</svg>
													</span>
												</div>
												<input
													id="dir"
													name="dir"
													type="text"
													placeholder={ rootDir }
													required
													className="p-2 pl-12 block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
										<div>
											<label htmlFor="blacklist" className="block text-sm font-medium leading-6 text-gray-900">
												Blacklist (separated by comma)
											</label>
											<div className="relative mt-2 rounded-md shadow-sm">
												<div className="pointer-events-none absolute inset-y-0 left-0 flex items-start pt-2 pl-3">
													<span className="text-gray-500 sm:text-sm">
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
															<path strokeLinecap="round" strokeLinejoin="round" d="M15 13.5H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
														</svg>
													</span>
												</div>
												<textarea
													id="blacklist"
													name="blacklist"
													rows={5}
													placeholder=".git, cache, ..."
													required
													defaultValue={ blacklist }
													className="p-2 pl-12 block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
										<div>
											<label htmlFor="toRemove" className="block text-sm font-medium leading-6 text-gray-900">
												Dir to Remove (separated by comma)
											</label>
											<div className="relative mt-2 rounded-md shadow-sm">
												<div className="pointer-events-none absolute inset-y-0 left-0 flex items-start pt-2 pl-3">
													<span className="text-gray-500 sm:text-sm">
														<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
															<path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
														</svg>
													</span>
												</div>
												<textarea
													id="toRemove"
													name="toRemove"
													required
													rows={3}
													defaultValue={ toRemove }
													placeholder="node_modules, dist, build ..."
													className="p-2 pl-12 block w-full rounded-md border-0 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
												/>
											</div>
										</div>
										<div className="mt-5">
											<Button
												disabled={isLoading}
												className="ml-auto flex items-center gap-2 rounded-md bg-second py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10"
												type="submit"
											>
												{isLoading ? "Loading..." : "Analyze"}
											</Button>
										</div>
									</form>
								)
								: (
									<>
										<img src={x} alt="" className='block mx-auto w-full object-contain' />
										<p className="text-center mb-5 font-semibold text-third">Loading...</p>
									</>
								) }
						</DialogPanel>
					</div>
				</div>
			</Dialog>
		</>
	)
}