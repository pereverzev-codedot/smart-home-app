import * as React from "react"
import PropTypes from "prop-types"
import { ResponsiveLine } from "@nivo/line"
import {ThemeContextConsumer} from "../../context/ThemeContext";
import "./graphics-panel.css"

export default function GraphicsPanel(props) {
	const { data = [], title } = props
  console.log(data)
	return (
		<div>
			<div className="graphs-wrapper">
				<div className="graph-item">
					<h3 className="graph-title">{title}</h3>
					<div className="graph-view">
            <ThemeContextConsumer>
              {context => {
                return(
                <ResponsiveLine
                data={data}
                margin={{ top: 10, right: 80, bottom: 95, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: "-20", max: "100", stacked: false, reverse: false }}
                axisTop={null}
                axisRight={null}
                theme={{ "textColor": `${context.theme === "dark" ? "#fff" : "#333333"}`,
                  "grid":{
                  "line": {
                    "stroke": `${context.theme === "dark" ? "#fff" : "#7d7d7d"}`
                  }
                  }}}
                colors={{"scheme":"set1"}}
                axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 45,
                legend: "",
                legendOffset: 36,
                legendPosition: "middle",
              }}
                axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Температура/Влажность",
                legendOffset: -40,
                legendPosition: "middle",
              }}
                pointSize={10}
                pointBorderWidth={2}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                  {
                    anchor: 'top',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: -0,
                    itemsSpacing: 0,
                    itemDirection: 'bottom-to-top',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
                />
                )
              }
              }
            </ThemeContextConsumer>
					</div>
				</div>
				<div className="graph-bottom-panel">
					<span>{data[0]?.data[1]?.x}</span>
					<span>{data[0]?.data[data[0]?.data?.length-1]?.x}</span>
				</div>
			</div>
		</div>
	)
}
GraphicsPanel.propTypes = {
	data: PropTypes.array,
	title: PropTypes.string,
}

GraphicsPanel.defaultProps = {
	data: [],
	title: "Undefined",
}
