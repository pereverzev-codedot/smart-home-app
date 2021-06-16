import * as React from "react"
import Alert from "@material-ui/lab/Alert"
import Snackbar from "@material-ui/core/Snackbar"
import { useHttp } from "../../hooks/http.hook"
import "./settings-panel.css"
import Loader from "../loader";

const AccessKeysStgPanel = () => {
	const { request } = useHttp()
  const [accessKeys, setAccessKeys] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [alertMsg, setAlertMsg] = React.useState("Register success")
  const [loading, setLoading] = React.useState(true)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  const getAccessKeys = React.useCallback(async () => {
    setLoading(true)
    try{
      const fetched = await request(`/api/link/access-keys/get`, "GET", null)
      console.log(fetched)
      setAccessKeys(fetched)
      setLoading(false)
    }
    catch (e) {
      console.log(e)
    }
  }, [request])

  React.useEffect(()=>{
    getAccessKeys()
  }, [getAccessKeys])

	const AddNewKeyHandler = async () => {
   try{
    const fetched = await request(`/api/link/access-keys/add`, "GET", null)
     setAlertMsg(fetched.message)
     setOpen(true)
     getAccessKeys()
   }
   catch (e) {
    console.log(e)
  }
	}

	return (
		<div className="settings-panel">
      <div className="">
        {
          loading ? <Loader/> : accessKeys.map((el)=>{
            return (
              <div key={el.id} className="">
                <span>Ключ: {el.accessKey}</span>
                <span>{el.active ? "Активен" : "Не активен"}</span>
              </div>
            )
          }).reverse()
        }
      </div>
			<div role="button" tabIndex={0} className="" onClick={AddNewKeyHandler}>
				Добавить ключ доступа
			</div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {alertMsg}
        </Alert>
      </Snackbar>
		</div>
	)
}

export default AccessKeysStgPanel
