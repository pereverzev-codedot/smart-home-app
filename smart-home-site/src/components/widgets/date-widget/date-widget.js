import * as React from "react"
import PropTypes from  'prop-types'
import "./date-widget.css"

export default function DateWidget(props) {
  const toOffsetDate = (offset) => {
    const d = new Date(new Date().getTime() + (offset * 1000));
    const hrs = d.getUTCHours();
    const mins = d.getUTCMinutes();
    const sec = d.getUTCSeconds();
    return `${hrs}:${mins}:${sec}`;
  }

  const [time, setTime] = React.useState(toOffsetDate(props.offset))
  const [weekDay, setWeekDay] = React.useState("Вторник")
  const [date, setDate] = React.useState("8 июня")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tick = () => {
    setTime(toOffsetDate(props.offset))
  }
  React.useEffect(()=>{
      const d = new Date(new Date().getTime() + (props.offset * 1000));
      let month; let day
        switch (d.getUTCMonth()) {
          case 0: {
            month = "Января"
            break
          }
          case 1: {
            month = "Февраля"
            break
          }
          case 2: {
            month = "Марта"
            break
          }
          case 3: {
            month = "Апреля"
            break
          }
          case 4: {
            month = "Мая"
            break
          }
          case 5: {
            month = "Июня"
            break
          }
          case 6: {
            month = "Июля"
            break
          }
          case 7: {
            month = "Августа"
            break
          }
          case 8: {
            month = "Сентября"
            break
          }
          case 9: {
            month = "Октября"
            break
          }
          case 10: {
            month = "Ноября"
            break
          }
          default: {
            month = "Декабря"
            break
          }
        }
        switch (d.getUTCDay()) {
          case 1: {
            day = "Понедельник"
            break
          }
          case 2: {
            day = "Вторник"
            break
          }
          case 3: {
            day = "Среда"
            break
          }
          case 4: {
            day = "Четверг"
            break
          }
          case 5: {
            day = "Пятница"
            break
          }
          case 6: {
            day = "Суббота"
            break
          }
          default: {
            day = "Воскресенье"
            break
          }

        }
      setWeekDay(day)
      setDate(`${d.getUTCDate()} ${month}`)

    // eslint-disable-next-line react/destructuring-assignment
  }, [setWeekDay, setDate, props.offset])
  React.useEffect(()=>{
    const timerId = setTimeout(tick,1000)
    // eslint-disable-next-line react/destructuring-assignment
  }, [setTime, props.offset, tick])

	return (
		<div className="data-widget">
			<div className="time-block">
				<span className="time-text">{time}</span>
			</div>
			<div className="date-block">
				<span className="date-text">{weekDay}</span>
				<span className="date-text">{date}</span>
			</div>
		</div>
	)
}


DateWidget.propTypes = {
  offset: PropTypes.number.isRequired
}
