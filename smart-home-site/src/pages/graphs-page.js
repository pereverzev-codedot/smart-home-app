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
					id: "Temperature",
					data: allData.map((el) => {
						const day = new Date(Date.parse(el.date))
						return {
							x: getStrData(day),
							y: el.oth.temperature,
						}
					}),
				},
				{
					id: "Humidity",
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
					id: "Temperature",
					data: allData.map((el) => {
						const day = new Date(Date.parse(el.date))
						return {
							x: getStrData(day),
							y: el.gth.temperature,
						}
					}),
				},
				{
					id: "Humidity",
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
					id: "Temperature",
					data: allData.map((el) => {
						const day = new Date(Date.parse(el.date))
						return {
							x: getStrData(day),
							y: el.hth.temperature,
						}
					}),
				},
				{
					id: "Humidity",
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
    document.title = "Graphs page"
  })
	return (
		<div className="graph-page">
			<h2>Graphics</h2>
			<GraphicsPanel data={oth} title="Outside" />
			<GraphicsPanel data={hth} title="Home" />
			<GraphicsPanel data={gth} title="Garage" />
		</div>
	)
}
