import * as React from "react"
import PropTypes from "prop-types"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper.min.css"

export default function WeatherLine(props) {
	const { forecast, daily } = props
	const [active, setActive] = React.useState(false)
	const handlrerSetActive = () => {
		setActive(!active)
	}

	if (forecast[0] !== undefined) {
		return (
			<div className="weather-line">
				{daily ? (
					<Swiper
						slidesPerView={2}
						observer={true}
						observeParents={true}
						observeSlideChildren={true}
						spaceBetween={5}
						shouldSwiperUpdate
					>
						{forecast[0].DailyForecasts.map((el) => {
							const date = new Date(Date.parse(el.Date))
							return (
								<SwiperSlide key={el._id}>
									<div className="weather-line-item">
										<span>{`${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}.${
											date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
										}`}</span>
										<div className="weather-line-item-dayli">
											<div
												className="weather-line-item"
												role="button"
												tabIndex={0}
												onClick={handlrerSetActive}
											>
												<img
													src={`./images/weather-icons/${
														active ? el.Day.Icon : el.Night.Icon
													}-s.png`}
													alt="weather-ico"
													className="weather-ico-min"
												/>
												<span className="weather-line-item__text">
													{active ? el.Day.IconPhrase : el.Night.IconPhrase}
												</span>
												<span>
													{active ? el.Temperature.Maximum.Value : el.Temperature.Minimum.Value}C
												</span>
											</div>
										</div>
									</div>
								</SwiperSlide>
							)
						})}
					</Swiper>
				) : (
					<Swiper
						slidesPerView={1}
						observer={true}
						observeParents={true}
						observeSlideChildren={true}
						spaceBetween={5}
						shouldSwiperUpdate
					>
						{forecast[0].twelveHourForecast.map((el) => {
							const date = new Date(Date.parse(el.DateTime))
							return (
								<SwiperSlide key={el._id}>
									<div className="weather-line-item">
										<span>{`${date.getHours()} часов	${
											date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
										}.${
											date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
										}`}</span>
										<img
											src={`./images/weather-icons/${el.WeatherIcon}-s.png`}
											alt="weather-ico"
											className="weather-ico-min"
										/>
										<span className="weather-line-item__text">{el.IconPhrase}</span>
										<span>{el.Temperature.Value}C</span>
									</div>
								</SwiperSlide>
							)
						})}
					</Swiper>
				)}
			</div>
		)
	}

	return <div>Loading</div>
}

WeatherLine.propTypes = {
	forecast: PropTypes.any.isRequired,
	daily: PropTypes.bool.isRequired,
}
