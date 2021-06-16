import * as React from "react"
import { useHttp } from "../hooks/http.hook"
import GraphicsPanel from "../components/graphics-panel"

export default function GraphsPage() {
	const InitialState = [{ id: null, data: [] }]
	const [oth, setOth] = React.useState(InitialState)
	const [hth, setHth] = React.useState(InitialState)
	const [gth, setGth] = React.useState(InitialState)
	const { request } = useHttp()
	const getGraphs = React.useCallback(async () => {
		try {
			const fetched = await request(`/api/link/graphs`, "GET", null)
			return fetched.splice(fetched.length - 10, 10)
		} catch (e) {
			console.log(e)
		}
	}, [request])

	const getStrData = (day) => {
		return `${day.getUTCHours()}:${day.getUTCMinutes()}:${day.getUTCSeconds()} ${day.getUTCDate()}-${
			day.getMonth() + 1
		}-${day.getUTCFullYear()}`
	}

	React.useEffect(() => {
		getGraphs().then((allData) => {
			const tempOth = [
				{
					id: "Температура",
					data: allData.map((el) => {
						const day = new Date(Date.parse(el.date))
						return {
							x: getStrData(day),
							y: el.oth.temperature,
						}
					}),
				},
				{
					id: "Влажность",
					data: allData.map((el) => {
						const day = new Date(Date.parse(el.date))
						return {
							x: getStrData(day),
							y: el.oth.humidity,
						}
					}),
				},
			]

			const tempGth = [
				{
					id: "Температура",
					data: allData.map((el) => {
						const day = new Date(Date.parse(el.date))
						return {
							x: getStrData(day),
							y: el.gth.temperature,
						}
					}),
				},
				{
					id: "Влажность",
					data: allData.map((el) => {
						const day = new Date(Date.parse(el.date))
						return {
							x: getStrData(day),
							y: el.gth.humidity,
						}
					}),
				},
			]
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

			setOth(tempOth)
			setGth(tempGth)
			setHth(tempHth)
		})
	}, [getGraphs])
  React.useEffect(()=>{
    document.title = "SmartHomeApp - Графики"
  })
	return (
		<div className="graph-page">
			<h2>Графики</h2>
			<GraphicsPanel data={hth} title="Дом" />
			<GraphicsPanel data={gth} title="Гараж" />
			<GraphicsPanel data={oth} title="Улица" />
		</div>
	)
}
