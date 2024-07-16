import { create } from 'zustand'

interface IAnalyzeResult {
	data: Record<string, string[]>
	fill: (data: Record<string, string[]>) => void
}

const useAnalyzeResult = create<IAnalyzeResult>()((set) => ({
	data: {},
	fill: (data) => set(state => ({ ...state, data })),
}))

export default useAnalyzeResult