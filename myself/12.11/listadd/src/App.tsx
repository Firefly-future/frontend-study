import { useState, useRef } from "react"
import Input from "./components/input/Input"
import classNames from "classnames"
import Select from "./components/select/Select"
function App() {
	const [showSelect, setShowSelect] = useState(false)
	const originalList = useRef<string[]>([
		"张三",
		"李四",
		"王五",
		"马六",
		"赵四",
		"王二",
	])
	const [list, setList] = useState(originalList.current)

	const [selected, setSelected] = useState<string[]>([])
	const changeSelected = (item: string) => {
		setSelected((prev) => {
			if (prev.includes(item)) {
				return prev.filter((i) => i !== item)
			}
			return [...prev, item]
		})
	}
	const filterList = (searchitem: string) => {
		if (!searchitem) return originalList.current
		return originalList.current.filter((i) => i.includes(searchitem))
	}
	const handleSearch = (searchText: string) => {
		setList(filterList(searchText))
	}

	const change = () => {
		setShowSelect(!showSelect)
	}
	const del = (item: string) => {
		setSelected((v) => v.filter((i) => i !== item))
	}
	return (
		<div className="app">
			<div className="header">
				<h2>xm-select下拉框多选带搜索实例</h2>
				<div
					className="placeholder"
					onClick={() => change()}
				>
					{selected.length > 0 ? (
						selected.map((item) => (
							<b key={item}>
								{item}
								<svg
									onClick={(e) => {
										del(item)
										e.stopPropagation()
									}}
									className="icon"
									viewBox="0 0 1024 1024"
									version="1.1"
									xmlns="http://www.w3.org/2000/svg"
									p-id="11397"
									width="20"
									height="20"
								>
									<path
										d="M511.945051 0A511.976315 511.976315 0 1 1-0.031264 511.976315 512.071055 512.071055 0 0 1 511.945051 0z m0 0"
										fill="#E9EFFF"
										p-id="11398"
									></path>
									<path
										d="M705.167792 646.791692l-134.720637-134.720637 134.673267-134.720636a41.306749 41.306749 0 0 0-58.359995-58.407365l-134.720636 134.720637-134.720637-134.673267a41.306749 41.306749 0 0 0-58.407364 58.359995l134.720636 134.720636-134.673266 134.720637a41.306749 41.306749 0 0 0 58.359994 58.407364l134.720637-134.720636 134.720636 134.673266a41.306749 41.306749 0 1 0 58.407365-58.359994z m0 0"
										fill="#2460F7"
										p-id="11399"
									></path>
								</svg>
							</b>
						))
					) : (
						<span>请选择</span>
					)}
					<svg
						className={classNames("icon", {
							rotate: showSelect,
						})}
						viewBox="0 0 1024 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="1885"
						width="20"
						height="20"
					>
						<path
							d="M148.8 260.8c-14.4 14.4-14.4 38.4 0 52.8L512 796.8c14.4 14.4 38.4 14.4 52.8 0L928 313.6c14.4-14.4 14.4-38.4 0-52.8"
							p-id="1886"
							fill="#8a8a8a"
						></path>
					</svg>
				</div>
			</div>
			<div>
				{showSelect && (
					<Input
						onSearch={handleSearch}
					/>
				)}
			</div>
			<div className="select">
				{showSelect && (
					<Select
						list={list}
						selected={selected}
						onChange={changeSelected}
					/>
				)}
			</div>
		</div>
	)
}

export default App
