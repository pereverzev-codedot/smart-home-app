import * as React from "react"
import {Swiper, SwiperSlide} from "swiper/react";
import  useMediaQuery from "@material-ui/core/useMediaQuery"
import ControlBlock from "../control-block"
import "./control-panel.css"
import {useHttp} from "../../hooks/http.hook";



const ControlPanel = () => {
  const [sensorValues, setSensorValues] = React.useState([])
  const { request } = useHttp()
  const getSensorValues = React.useCallback(async () => {
    try {
      const fetched = await request(`/api/link/sensor/values`, "GET", null)
      setSensorValues(fetched)
      console.log(fetched)
    } catch (e) {
      console.log(e)
    }
  }, [request])

  const getSensorChangables = React.useCallback(async () => {
    try {
      const fetched = await request(`/api/link/sensor/changable`, "GET", null)
      console.log(fetched)
    } catch (e) {
      console.log(e)
    }
  }, [request])
  const active = useMediaQuery('(min-width: 641px)')
  React.useEffect(()=>{
    document.title = "Main page"
  })
  React.useEffect(() => {
    let mounted = true
    if(mounted){
      setInterval( () => {
        getSensorValues()
        getSensorChangables()
      }, 3000)
    }
    return function cleanup() {
      mounted = false
    }
  }, [getSensorValues, getSensorChangables])
  console.log(sensorValues)
	return (
		<Swiper observeParents={true} observeSlideChildren={true} observer={true} slidesPerView={1} slidesPerColumn={2} spaceBetween={30} resizeObserver={true} breakpoints={{
      "641": {
        "slidesPerView": 2,
        "spaceBetween": 30,
        "slidesPerColumn": 2,

      },
      "1440":{
        "slidesPerView": 2,
        "slidesPerColumn": 2,
        "spaceBetween": 60,

      }
		}} className={`control-panel ${active && " swiper-no-swiping"}`}>
      <SwiperSlide>
			<ControlBlock data={[sensorValues[0]?.hth.humidity,sensorValues[0]?.hth.temperature, sensorValues[0]?.gas, sensorValues[0]?.lightr1]} switchable={[]} />
      </SwiperSlide>
      <SwiperSlide>
			<ControlBlock data={[sensorValues[0]?.hth.humidity,sensorValues[0]?.hth.temperature, sensorValues[0]?.lightr2]} switchable={[]} />
      </SwiperSlide>
      <SwiperSlide>
			<ControlBlock data={[sensorValues[0]?.gth.humidity,sensorValues[0]?.gth.temperature, sensorValues[0]?.water]} switchable={[]} />
      </SwiperSlide>
      <SwiperSlide>
			<ControlBlock data={[sensorValues[0]?.oth.humidity,sensorValues[0]?.oth.temperature, sensorValues[0]?.humidity]} switchable={[]} />
      </SwiperSlide>
    </Swiper>
	)
}

export default ControlPanel
