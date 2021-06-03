import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getVersion } from "../redux/actions/authAction";
function Footer() {
  const dispatch = useDispatch()
  const version = useSelector(state=>state.authState.version)
  useEffect(()=>{
    console.log("version")
    dispatch(getVersion())
  },[dispatch])
  return (
    <footer className="container">
      <p>&copy; Chaiyaphat@company  API version {version}</p>
    </footer>
  );
}

export default Footer;
