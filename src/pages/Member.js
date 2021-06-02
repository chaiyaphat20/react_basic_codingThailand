import { useContext } from "react";
import { useHistory } from "react-router";
import { UserStoreContext } from "../context/UseContext";

  
function Member() {
  const history = useHistory();
  const userStore = useContext(UserStoreContext);
  console.log(userStore)
  let comp = null
  if (userStore){
    comp = (
      <div>
        {userStore.profile.name} - {userStore.profile.email}
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
