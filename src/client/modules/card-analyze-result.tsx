import { useState } from "react"
// @ts-ignore
import x from '../assets/miku.gif'
import deleteDir from "../adapters/ipc/deleteDir"

export default function CardAnalyzeResult({ title, value }: { title: string, value: string[] }) {
	const [loading, setLoading] = useState(false)
	const [path, setPath] = useState(value.map(v => ({
		path: v,
		checked: false
	})))

	const handleChange = (path: string) => (e: any) => setPath(prev => prev.map(p => {
		if (p.path === path) {
			return {
				...p,
				checked: e.target.checked
			}
		}
		return p
	}))

	const handleAll = (e: any) => {
		if (e.target.checked) {
			setPath(prev => prev.map(p => ({
				...p,
				checked: true
			})))
		} else {
			setPath(prev => prev.map(p => ({
				...p,
				checked: false
			})))
		}
	}

	const handleDelete = async () => {
		setLoading(true)
		const selected = path.filter(v => v.checked).map(v => v.path)

		try {
			const res = await deleteDir(selected)
			if (res.status === 200) {
				setPath(prev => prev.filter(v => !selected.includes(v.path)))
			}
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="border rounded-3 p-5 shadow mt-8">
			<h3 className="text-xl font-semibold text-third m-0">{ title }</h3>
			<div className="flex justify-end gap-4 items-center">
				<p className="font-semibold">Total: { path.filter(v => v.checked).length }</p>
				<button className="bg-red-600 rounded text-white px-2 py-1" onClick={ handleDelete }>Delete</button>
			</div>
			{ loading
				? (
					<>
						<img src={ x } alt="" className='block mx-auto mt-12' />
						<p className="text-center mb-5 font-semibold text-third">Loading...</p>
					</>
				)
				: (
					<div className="overflow-auto pb-3 mt-5">
						<table className="table-auto min-w-full">
							<thead>
								<tr>
									<th className="border border-gray-300 p-3">
										<div className="min-w-[30px] max-w-[30px] w-full h-full flex align-center justify-center">
											<input type="checkbox" className="cursor-pointer w-[15px] h-[15px]" onChange={ handleAll } />
										</div>
									</th>
									<th className="border border-gray-300 p-3 text-left">Path</th>
								</tr>
							</thead>
							<tbody>
								{ path.map((v, i) => (
									<tr key={ i }>
										<td className="border border-gray-300 p-3">
											<div className="min-w-[30px] max-w-[30px] w-full h-full flex align-center justify-center">
												<input type="checkbox" className="cursor-pointer w-[15px] h-[15px]" onChange={ handleChange(v.path) } checked={ v.checked } />
											</div>
										</td>
										<td className="border border-gray-300 p-3 whitespace-nowrap">{ v.path }</td>
									</tr>
								)) }
							</tbody>
						</table>
					</div>
				) }
		</div>
	)
}