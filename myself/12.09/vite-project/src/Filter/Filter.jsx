import React from "react"
import classNames from "classnames"
import style from "./Filter.module.scss"
import { FilterTypeList } from "../constant"

const Filter = (props) => {
	return (
		<div className={style.filter}>
			{FilterTypeList.map((item) => {
				return (
					<button
						key={item.key}
						className={classNames("btn", {
							success: props.Curkey === item.key,
						})}
            onClick={()=>props.onChange(item.key)}
					>
						{item.text}
					</button>
				)
			})}
		</div>
	)
}

export default Filter
