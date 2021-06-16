import * as React from "react"
import { Switch } from "@material-ui/core"
import { useHttp } from "../../hooks/http.hook"
import "./home-settings-panel.css"
import HSPDropdownItem from "./hsp-dropdown-item";
import HspBlockSlider from "./hsp-block-slider";
import HspBlockItem from "./hsp-block-item";

const HomeSettingsPanel = () => {
	const [changableValues, setChangablesValues] = React.useState([])
	const { request } = useHttp()

	const getSensorChangables = React.useCallback(async () => {
		try {
			const fetched = await request(`/api/link/sensor/changable`, "GET", null)
			setChangablesValues(fetched)
		} catch (e) {
			console.log(e)
		}
	}, [request])


	React.useEffect(() => {
		let mounted = true
		let timerChangableId
		if (mounted) {
			setTimeout(() => {
				getSensorChangables()
			}, 1000)
			timerChangableId = setInterval(() => {
				getSensorChangables()
			}, 1000)
		}
		return function cleanup() {
			clearInterval(timerChangableId)
			mounted = false
		}
	}, [getSensorChangables])
	return (
		<div className="settings-panel">
			<div>
        <div >
          <span>Настройка сообщений</span>
          <div>
            <div className="home-block-wrapper">
              <span>Уведомления о газе</span>
              <HspBlockItem el={changableValues[0]?.gasAlert}/>
              <HspBlockSlider maxValueS={100} el={changableValues[0]?.gasAlertStartVal}/>
              <HspBlockSlider maxValueS={100} el={changableValues[0]?.gasAlertStopVal}/>
              <HspBlockSlider maxValueS={10000} el={changableValues[0]?.gasAlertDelay}/>
            </div>
            <div className="home-block-wrapper">
              <span>Уведомления о воде</span>
              <HspBlockItem el={changableValues[0]?.waterAlert}/>
              <HspBlockSlider maxValueS={200} el={changableValues[0]?.waterAlertStartVal}/>
              <HspBlockSlider maxValueS={200} el={changableValues[0]?.waterAlertStopVal}/>
              <HspBlockSlider maxValueS={10000} el={changableValues[0]?.waterAlertDelay}/>
            </div>
            <div className="home-block-wrapper">
              <span>Уведомления о влажности</span>
              <HspBlockItem el={changableValues[0]?.humidityAlert}/>
              <HspBlockSlider maxValueS={2000} el={changableValues[0]?.humidityAlertStartVal}/>
              <HspBlockSlider maxValueS={2000} el={changableValues[0]?.humidityAlertStopVal}/>
              <HspBlockSlider maxValueS={10000} el={changableValues[0]?.humidityAlertDelay}/>
            </div>
          </div>
        </div>
        <HspBlockItem el={changableValues[0]?.allLight}/>
        <div className="home-block-wrapper">
          <HSPDropdownItem el={changableValues[0]?.setLightPort1}/>
          <HSPDropdownItem el={changableValues[0]?.setLightPort2}/>
          <HSPDropdownItem el={changableValues[0]?.setWateringPort}/>
          <HSPDropdownItem el={changableValues[0]?.setPumpingPort}/>
        </div>
			</div>
		</div>
	)
}

export default HomeSettingsPanel
