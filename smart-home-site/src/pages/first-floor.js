import * as React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { useHttp } from "../hooks/http.hook"
import ControlBlock from "../components/control-block"
import GraphicsPanel from "../components/graphics-panel";
import "../components/control-panel/control-panel.css"

export default function FirstFloorPage() {
  const InitialState = [{ id: null, data: [] }]
  const [hth, setHth] = React.useState(InitialState)
	const [sensorValues, setSensorValues] = React.useState([])
	const [changableValues, setChangablesValues] = React.useState([])
	const { request } = useHttp()
  const getGraphs = React.useCallback(async () => {
    try {
      const fetched = await request(`/api/link/graphs`, "GET", null)
      return fetched.splice(fetched.length - 10, 10)
    } catch (e) {
      console.log(e)
    }
  }, [request])
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
	React.useEffect(() => {
		document.title = "SmartHomeApp - Первый этаж"
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
  const getStrData = (day) => {
    return `${day.getUTCHours()}:${day.getUTCMinutes()}:${day.getUTCSeconds()} ${day.getUTCDate()}-${
      day.getMonth() + 1
    }-${day.getUTCFullYear()}`
  }
  React.useEffect(() => {
    getGraphs().then((allData) => {
      const tempHth = [
        {
          id: "Температура",
          data: allData.map((el) => {
            const day = new Date(Date.parse(el.date))
            return {
              x: getStrData(day),
              y: el.hth.temperature,
            }
          }),
        },
        {
          id: "Влажность",
          data: allData.map((el) => {
            const day = new Date(Date.parse(el.date))
            return {
              x: getStrData(day),
              y: el.hth.humidity,
            }
          }),
        },
      ]
      setHth(tempHth)
    })
  }, [getGraphs])
  const active = useMediaQuery("(min-width: 1200px)")
  return (
    <div className="single-page-wrapper">
      <Swiper
        observeParents={true}
        observeSlideChildren={true}
        observer={true}
        slidesPerView={1}
        slidesPerColumn={1}
        spaceBetween={30}
        resizeObserver={true}
        breakpoints={{
          1200: {
            slidesPerView: 2,
            slidesPerColumn: 1,
            spaceBetween: 60,
          },
        }}
        className={`single-page-cb-wrapper ${active && " swiper-no-swiping"}`}
      >
        <SwiperSlide>

			<ControlBlock
				data={[
					sensorValues[0]?.hth.humidity,
					sensorValues[0]?.hth.temperature,
					sensorValues[0]?.gas,
				]}
				switchable={[
					changableValues[0]?.firstFloorLight,
					changableValues[0]?.firstFloorLight1,
					changableValues[0]?.firstFloorLight2,
					changableValues[0]?.firstFloorLight3,
					changableValues[0]?.firstFloorLight4,
				]}
        slidableMaxValue={500}
        title="Настройки света"
			/>
        </SwiperSlide>
        <SwiperSlide>

			<ControlBlock
				data={[sensorValues[0]?.lightr1]}
				switchable={[changableValues[0]?.isAutoLight1]}
        slidableMaxValue={500}
				slidable={[changableValues[0]?.autoLightOn1, changableValues[0]?.autoLightOff1]}
        title="Настройки автоосвещения"
			/>
        </SwiperSlide>
      </Swiper>
      <GraphicsPanel data={hth} title="Дом" />
		</div>
	)
}
