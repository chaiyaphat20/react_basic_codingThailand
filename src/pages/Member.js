//redux
import { useSelector } from "react-redux";

  
function Member() {
  const dataFromRedux = useSelector(state=>state.authState.profile)
  let comp = null
  if (dataFromRedux){
    comp = (
      <div>
        {dataFromRedux.name} - {dataFromRedux.email}
      </div>
    )
  }
  return (
    <div>
      Member
      Hello 
      {comp}
    </div>
  )
}

export default Member
