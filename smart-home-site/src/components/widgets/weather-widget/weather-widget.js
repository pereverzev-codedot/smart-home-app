import * as React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Pagination } from "swiper/core"

import { useHttp } from "../../../hooks/http.hook"
import WeatherLine from "./weather-line/weather-line"
// install Swiper modules

import "swiper/swiper.min.css"
import "swiper/components/pagination/pagination.min.css"
import "./weather-widget.css"

SwiperCore.use([Pagination])

export default function WeatherWidget() {
	const { request } = useHttp()
  const [loading, setLoading] = React.useState(true)
	const [weatherDaily, setWeatherDaily] = React.useState(null)
	const [weatherHourly, setWeatherHourly] = React.useState(null)
  const [currentWeather, setCurrentWeather] = React.useState(null)

	// console.log(weatherDaily)
	// console.log(weatherHourly)

	const SendChangedOption = React.useCallback(async () => {
		try {
			const value = document.getElementById("key").value
			const key = document.getElementById("value").value
			const sended = await request(`/api/link/change`, "POST", { value, key })
		} catch (e) {
			console.log(e)
		}
	}, [request])

	const getWeatherDailyData = React.useCallback(async () => {
		try {
      setLoading(true)
		  const fetched = await request(`/api/link/weather/daily`, "GET", null)
			setWeatherDaily(fetched)
      setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}, [request])

	const getWeatherHourData = React.useCallback(async () => {
		try {
		  setLoading(true)
			const fetched = await request(`/api/link/weather/hour`, "GET", null)
			setWeatherHourly(fetched)
      setLoading(false)
		} catch (e) {
			console.log(e)
		}
	}, [request])

	React.useEffect(() => {
	  let mounted = true
    if(mounted){
		getWeatherDailyData()
		getWeatherHourData()

    }
    return function cleanup() {
        mounted = false
    }
	}, [getWeatherDailyData, getWeatherHourData])

	return (
     loading ? <div> Loading </div> : <div className="weather-widget">
        <div className="weather-active">
          <div className="weather-wrapper">
            <div className="weather-left">
              <span>Витебск</span>
              <img
                src={`./images/weather-icons/${weatherHourly !== null && weatherHourly[0].twelveHourForecast.find((el)=>{
                  const date = new Date(Date.parse(el.DateTime))
                  const currDate = new Date()
                  if (date.getHours() === currDate.getHours()+1){return el.WeatherIcon}
                }).WeatherIcon}-s.png`}
                className="weather-main-icon"
                alt="weather-ico"
              />
              <span>{weatherHourly !== null && weatherHourly[0].twelveHourForecast.map((el)=>{
                const date = new Date(Date.parse(el.DateTime))
                const currDate = new Date()
                 if (date.getHours() === currDate.getHours()+1){ return el.Temperature.Value}
               })}C</span>
            </div>
            <div className="weather-right">

              <span>{weatherHourly !== null && weatherHourly[0].twelveHourForecast.map((el)=>{
                const date = new Date(Date.parse(el.DateTime))
                const currDate = new Date()
                if (date.getHours() === currDate.getHours()+1){ return el.IconPhrase}
              })}</span>
              <span>{weatherDaily !== null && weatherDaily[0]?.DailyForecasts[0].Temperature.Maximum.Value}C / {weatherDaily !== null && weatherDaily[0]?.DailyForecasts[0].Temperature.Minimum.Value}C</span>
            </div>
          </div>
          <div>
            <span>{weatherDaily !== null && weatherDaily[0].Headline.Text}</span>
          </div>
        </div>
        <Swiper direction="vertical">
          <SwiperSlide>
            <WeatherLine daily={true} forecast={ weatherDaily !== null && weatherDaily}/>
          </SwiperSlide>
          <SwiperSlide>
            <WeatherLine daily={false} forecast={weatherHourly !== null && weatherHourly}/>
          </SwiperSlide>
        </Swiper>
         <input type="text" id="key" />
         <input type="text" id="value" />
         <button onClick={SendChangedOption} type="button">
           SEND
         </button>
      </div>
	)
}
