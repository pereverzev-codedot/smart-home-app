import * as React from "react"
import PropTypes from "prop-types"
import "./control-block.css"
import Loader from "../loader"
import ControlBlockItem from "./control-block-item"
import ControlBlockSlider from "./control-block-slider"

const ControlBlock = ({ data, switchable, title, slidable, slidableMaxValue }) => {
	function chunk(arr, size) {
		const result = []
		for (let i = 0; i < Math.ceil(arr.length / size); i += 1) {
			result.push(arr.slice(i * size, i * size + size))
		}
		return result
	}
	const newData = chunk(data, 2)
	return (
		<div className="control-block-wrapper">
			<div className="cb-title-wrapper">
				<h2>{title}</h2>
			</div>
			<div className="control-block">
				<div className="sensor-wrapper">
					{newData.map((array) => {
						if (array[0] === undefined) {
							return (
								<div key={Math.random() * 10 + 1} className="wrapper-container">
									<Loader />
								</div>
							)
						}
						return (
							<div key={Math.random() * 10 + 1} className="wrapper-container">
								{array.map((el) => {
									return (
										<div key={Math.random() * 10 + 1} className="sensor-info">
											<span className="info-text">{Object.values(el)[0]}</span>
											<span className="info-value">{Object.values(el)[1]}</span>
										</div>
									)
								})}
							</div>
						)
					})}
				</div>
				<div className="sensor-switcher">
					{switchable === undefined ? (
						<Loader />
					) : (
						switchable.map((el) => {
							if (el === undefined) {
								return null
							}
							return <ControlBlockItem key={el.key} el={el} />
						})
					)}
					{slidable === undefined
						? null
						: slidable.map((el) => {
								if (el === undefined) {
									return null
								}
								return <ControlBlockSlider maxValueS={slidableMaxValue} key={el.key} el={el} />
						  })}
				</div>
			</div>
		</div>
	)
}

ControlBlock.propTypes = {
	data: PropTypes.array.isRequired,
	switchable: PropTypes.array.isRequired,
	title: PropTypes.string.isRequired,
	slidable: PropTypes.array.isRequired,
  slidableMaxValue: PropTypes.number
}

ControlBlock.defaultProps = {
  slidableMaxValue: 100,
}

export default ControlBlock
