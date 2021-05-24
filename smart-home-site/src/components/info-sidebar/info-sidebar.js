import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"

import SwiperCore, { Pagination } from "swiper/core"

// install Swiper modules

import "swiper/swiper.min.css"
import "swiper/components/pagination/pagination.min.css"

import "./info-sidebar.css"

SwiperCore.use([Pagination])

const InfoSideBar = () => {
	const [open, setOpen] = useState(false)

	const openHandler = () => {
		setOpen(!open)
	}
	return (
		<div className={`right-bar ${open && "active"}`}>
			<span className="right-bar-toggle" role="button" tabIndex={0} onClick={openHandler}>
				<span className="right-bar-toggle-line" />
			</span>
			<div className="right-bar-section">
				<div className="user-widget">
					<div className="user-img-wrapper">
						<img src="https://via.placeholder.com/150" alt="User inform" className="user-img" />
					</div>
					<div className="user-info-text">
						<span>MitsuruYano</span>
						<span>ghostsword2409@gmail.com</span>
						<span>My sweet home</span>
					</div>
				</div>
				<div className="right-bar-content">
					<div className="weather-widget">
						<div className="weather-active">
							<div className="weather-wrapper">
								<div className="weather-left">
									<span>Витебск</span>
									<img
										src="./images/weather-icons/20-s.png"
										className="weather-main-icon"
										alt="weather-ico"
									/>
									<span>7.6C</span>
								</div>
								<div className="weather-right">
									<span>Some weather data</span>
									<span>Облачно</span>
									<span>23.5C / 10C</span>
								</div>
							</div>
							<div>
								<span>Четверг, поздняя ночь - Пятница, вечер: ливни и грозы</span>
							</div>
						</div>
						<Swiper direction="vertical">
							<SwiperSlide>
								<div className="weather-line">
									<div className="weather-line-item">
										<span>25</span>
										<img
											src="./images/weather-icons/01-s.png"
											alt="weather-ico"
											className="weather-ico-min"
										/>
										<span>5C</span>
										<span>15C</span>
									</div>
									<div className="weather-line-item">
										<span>26</span>
										<img
											src="./images/weather-icons/02-s.png"
											alt="weather-ico"
											className="weather-ico-min"
										/>
										<span>10C</span>
										<span>15C</span>
									</div>
									<div className="weather-line-item">
										<span>27</span>
										<img
											src="./images/weather-icons/03-s.png"
											alt="weather-ico"
											className="weather-ico-min"
										/>
										<span>10C</span>
										<span>23.5C</span>
									</div>
									<div className="weather-line-item">
										<span>28</span>
										<img
											src="./images/weather-icons/04-s.png"
											alt="weather-ico"
											className="weather-ico-min"
										/>
										<span>12C</span>
										<span>24.6C</span>
									</div>
									<div className="weather-line-item">
										<span>29</span>
										<img
											src="./images/weather-icons/05-s.png"
											alt="weather-ico"
											className="weather-ico-min"
										/>
										<span>12C</span>
										<span>24.6C</span>
									</div>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className="weather-line">
									<div className="weather-line-item">
										<span>25</span>
										<img
											src="./images/weather-icons/01-s.png"
											alt="weather-ico"
											className="weather-ico-min"
										/>
										<span>5C</span>
										<span>15C</span>
									</div>
									<div className="weather-line-item">
										<span>26</span>
										<img
											src="./images/weather-icons/02-s.png"
											alt="weather-ico"
											className="weather-ico-min"
										/>
										<span>10C</span>
										<span>15C</span>
									</div>
									<div className="weather-line-item">
										<span>27</span>
										<img
											src="./images/weather-icons/03-s.png"
											alt="weather-ico"
											className="weather-ico-min"
										/>
										<span>10C</span>
										<span>23.5C</span>
									</div>
									<div className="weather-line-item">
										<span>28</span>
										<img
											src="./images/weather-icons/04-s.png"
											alt="weather-ico"
											className="weather-ico-min"
										/>
										<span>12C</span>
										<span>24.6C</span>
									</div>
									<div className="weather-line-item">
										<span>29</span>
										<img
											src="./images/weather-icons/05-s.png"
											alt="weather-ico"
											className="weather-ico-min"
										/>
										<span>12C</span>
										<span>24.6C</span>
									</div>
								</div>
							</SwiperSlide>
						</Swiper>
					</div>
					<div className="data-widget">
						<div className="time-block">
							<span className="time-text">0:00</span>
						</div>
						<div className="date-block">
							<span className="date-text">Вторник</span>
							<span className="date-text">25 мая</span>
						</div>
					</div>
				</div>
				<div className="right-bar-bottom-bar">
					<div className="bottom-bar_element">theme</div>

					<Link to="/settings" className="bottom-bar_element">
						settings
					</Link>
					<Link
						to="/"
						className="bottom-bar_element"
						onClick={() => {
							localStorage.removeItem("userData")
						}}
					>
						leave
					</Link>
				</div>
			</div>
		</div>
	)
}

export default InfoSideBar
