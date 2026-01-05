import style from "./Input.module.scss"

interface props {
	onSearch: (searchText: string) => void
}

const Input: React.FC<props> = ({ onSearch }) => {
	return (
		<div className={style.input}>
			<input
				type="text"
				className={style.inp}
				placeholder="请选择"
				onChange={(e) => {
					const searchText = e.target.value
					onSearch(searchText)
				}}
			/>
			<svg
				className={style.icon}
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				p-id="2942"
				width="20"
				height="20"
			>
				<path
					d="M450.56 763.904c173.056 0 312.832-140.288 312.832-312.832S623.616 137.728 450.56 137.728 137.728 278.016 137.728 450.56s140.288 313.344 312.832 313.344z m311.808-62.976l197.632 197.632c16.896 16.896 16.896 44.544 0 61.44-16.896 16.896-44.544 16.896-61.44 0l-197.632-197.632c-68.608 55.296-155.648 88.064-250.368 88.064-220.672 0-399.36-179.2-399.36-399.872s178.688-399.36 399.36-399.36 399.872 178.688 399.872 399.872c0 94.208-33.28 181.248-88.064 249.856z"
					fill="#999999"
					p-id="2943"
				></path>
			</svg>
		</div>
	)
}

export default Input
