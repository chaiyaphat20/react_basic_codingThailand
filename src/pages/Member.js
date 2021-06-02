import { useContext } from "react";
import { UserStoreContext } from "../context/UseContext";

  
function Member() {
  const userStore = useContext(UserStoreContext);
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
