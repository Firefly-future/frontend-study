import { useEffect, useState } from "react"

interface Props {
	label: string
	defaultValue?: string
	value?: string
	onChange?: (value: string) => void
}

const Child1: React.FC<Props> = ({
	label,
	value,
	onChange,
	defaultValue
}) => {
	// console.log(label,value,onChange)
	const [title, setTitle] = useState(value ?? defaultValue)
	const change = (text: string) => {
		setTitle(text)
		onChange?.(text)
	}
	useEffect(() => {
		if (typeof value !== "undefined" && value !== title) {
			setTitle(value)
		}
	}, [value])
	return (
		<div>
			<span>{label}</span>
			<input
				type="text"
				value={title}
				onChange={(e) => {
					change(e.target.value)
				}}
			/>
			<i onClick={() => setTitle("")}>清空</i>
		</div>
	)
}

export default Child1
