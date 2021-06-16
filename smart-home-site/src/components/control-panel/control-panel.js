import * as React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import ControlBlock from "../control-block"
import "./control-panel.css"
import { useHttp } from "../../hooks/http.hook"

const ControlPanel = () => {
	const [sensorValues, setSensorValues] = React.useState([])
	const [changableValues, setChangablesValues] = React.useState([])
	const { request } = useHttp()
	const getSensorValues = React.useCallback(async () => {
		try {
			const fetched = await request(`/api/link/sensor/values`, "GET", null)
			setSensorValues(fetched)
		} catch (e) {
			console.log(e)
		}
	}, [request])

	const getSensorChangables = React.useCallback(async () => {
		try {
			const fetched = await request(`/api/link/sensor/changable`, "GET", null)
			setChangablesValues(fetched)
		} catch (e) {
			console.log(e)
		}
	}, [request])
	const active = useMediaQuery("(min-width: 641px)")
	React.useEffect(() => {
		document.title = "SmartHomeApp - Главная"
	})

	React.useEffect(() => {
		let mounted = true
		let timerValuesId
		let timerChangableId
		if (mounted) {
			setTimeout(() => {
				getSensorValues()
				getSensorChangables()
			}, 1000)
			timerValuesId = setInterval(() => {
				getSensorValues()
			}, 1000)
			timerChangableId = setInterval(() => {
				getSensorChangables()
			}, 1000)
		}
		return function cleanup() {
			clearInterval(timerValuesId)
			clearInterval(timerChangableId)
			mounted = false
		}
	}, [getSensorValues, getSensorChangables])
	return (
		<Swiper
			observeParents={true}
			observeSlideChildren={true}
			observer={true}
			slidesPerView={1}
			slidesPerColumn={2}
			spaceBetween={30}
			resizeObserver={true}
			breakpoints={{
				641: {
					slidesPerView: 2,
					spaceBetween: 30,
					slidesPerColumn: 2,
				},
				1440: {
					slidesPerView: 2,
					slidesPerColumn: 2,
					spaceBetween: 60,
				},
			}}
			className={`control-panel ${active && " swiper-no-swiping"}`}
		>
			<SwiperSlide>
				<ControlBlock
					data={[
						sensorValues[0]?.hth.humidity,
						sensorValues[0]?.hth.temperature,
						sensorValues[0]?.gas,
						sensorValues[0]?.lightr1,
					]}
					switchable={[
						changableValues[0]?.isAutoLight1,
						changableValues[0]?.firstFloorLight,
						changableValues[0]?.firstFloorLight1,
						changableValues[0]?.firstFloorLight2,
						changableValues[0]?.firstFloorLight3,
						changableValues[0]?.firstFloorLight4,
					]}
					title="Первый этаж"
				/>
			</SwiperSlide>
			<SwiperSlide>
				<ControlBlock
					data={[
						sensorValues[0]?.hth.humidity,
						sensorValues[0]?.hth.temperature,
						sensorValues[0]?.lightr2,
					]}
					switchable={[
						changableValues[0]?.isAutoLight2,
						changableValues[0]?.secondFloorLight,
						changableValues[0]?.secondFloorLight1,
						changableValues[0]?.secondFloorLight2,
						changableValues[0]?.secondFloorLight3,
						changableValues[0]?.secondFloorLight4,
					]}
					title="Второй этаж"
				/>
			</SwiperSlide>
			<SwiperSlide>
				<ControlBlock
					data={[
						sensorValues[0]?.gth.humidity,
						sensorValues[0]?.gth.temperature,
						sensorValues[0]?.water,
					]}
					switchable={[
						changableValues[0]?.garageLight,
						changableValues[0]?.garageLight1,
						changableValues[0]?.garageLight2,
						changableValues[0]?.waterPump,
					]}
					title="Гараж"
				/>
			</SwiperSlide>
			<SwiperSlide>
				<ControlBlock
					data={[
						sensorValues[0]?.oth.humidity,
						sensorValues[0]?.oth.temperature,
						sensorValues[0]?.humidity,
					]}
					switchable={[
						changableValues[0]?.outsideLight,
						changableValues[0]?.outsideLight1,
						changableValues[0]?.outsideLight2,
						changableValues[0]?.waterFlap,
					]}
					title="Участок"
				/>
			</SwiperSlide>
		</Swiper>
	)
}

export default ControlPanel
