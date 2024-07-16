import useAnalyzeResult from '../store/analyze-result'
import ScanButton from './scan-button'
// @ts-ignore
import x from '../assets/miku.gif'
import CardAnalyzeResult from './card-analyze-result'

export default function HomeModule() {
	const data = useAnalyzeResult(s => s.data)

	return (
		<div className='p-5'>
			<div className="flex items-center justify-between">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-third sm:truncate sm:text-3xl sm:tracking-tight">
						Dev Removal
					</h2>
				</div>
				<ScanButton />
			</div>
			<div className="my-10">
				{ data && Object.keys(data).length > 0
					? (Object.entries(data).map(([key, value]) => <CardAnalyzeResult key={key} title={key} value={value} />))
					: (
						<>
							<img src={ x } alt="" className='block mx-auto mt-12' />
							<p className="text-center mb-5 font-semibold text-third">No Data</p>
						</>
					) }
			</div>
		</div>
	)
}