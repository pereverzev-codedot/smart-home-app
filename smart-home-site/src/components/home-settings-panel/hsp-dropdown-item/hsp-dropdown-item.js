import * as React from "react";
import PropTypes from "prop-types"
import {Select, MenuItem, ListSubheader, } from "@material-ui/core";
import {useHttp} from "../../../hooks/http.hook";
import CBLoader from "../hsp-block-slider/cb-loader/cb-loader";
import Loader from "../../loader/loader";

export default function HSPDropdownItem({el}) {
  const { request } = useHttp()
  const [loading, setLoading] = React.useState(false)
  const SendChangedOption = (value, key) => {
    try {
      setLoading(true)
      request(`/api/link/change`, "POST", { value, key })
        .then((res) => {
          setLoading(false)
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (e) {
      console.log(e)
    }
  }
  return(
    <div className="sensor-switch">
      {el === undefined ? (
          <Loader />
        ) :
        (<>
          <span className="switch-text">{el.title}</span>
          {loading ? (
              <CBLoader/>
            ) :
            (<Select defaultValue={el.value}  id="grouped-select">
              <ListSubheader>Стандартное значение</ListSubheader>
              <MenuItem value={el.value}>{el.value}</MenuItem>
              <ListSubheader>Свет</ListSubheader>
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <ListSubheader>Клапан</ListSubheader>
              <MenuItem value={3}>Option 3</MenuItem>
              <ListSubheader>Насос</ListSubheader>
              <MenuItem value={3}>Option 4</MenuItem>
            </Select>)
          }
            </>
        )
}
    </div>
  )
}

HSPDropdownItem.propTypes = {
    el: PropTypes.object.isRequired,
}

