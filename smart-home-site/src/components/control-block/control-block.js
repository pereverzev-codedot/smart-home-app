import * as React from "react"
import PropTypes from  'prop-types'
import { Switch } from "@material-ui/core"
import "./control-block.css"
import Loader from "../loader";

const ControlBlock = ({data, changable}) => {
  function chunk(arr, size) {
    const result = [];
    for (let i = 0; i < Math.ceil(arr.length/size); i += 1) {
      result.push(arr.slice((i * size), (i * size) + size));
    }
    return result;
  }
  const newData = chunk(data,2)
	return (
		<div className="control-block">
			<div className="sensor-wrapper">
          {
            newData.map((array)=>{
              if (array[0] === undefined){
                return (
                  <div key="" className="wrapper-container">
                  <Loader/>
                  </div>
                )
              }
              return (
                <div key="" className="wrapper-container">
                  {
                    array.map((el)=>{
                      return (
                        <div key=""  className="sensor-info">
                          <span className="info-text">{Object.values(el)[0]}</span>
                          <span className="info-value">{Object.values(el)[1]}</span>
                        </div>

                      )
                    })
                  }
                </div>
              )
            })
          }
			</div>
			<div className="sensor-switcher">

				<div className="sensor-switch">
					<span className="svitch-text">Light in the room 1</span>
					<Switch checked={true}/>
				</div>

			</div>
		</div>
	)
}

ControlBlock.propTypes = {
  data: PropTypes.array.isRequired,
  changable: PropTypes.array.isRequired
}

export default ControlBlock
