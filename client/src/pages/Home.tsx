import { useEffect } from "react";
import { useUserStore } from "../stores/useUserStore"
import Chat from "./Chat";
import Welcome from "./Welcome";


const Home = () => {
    const {user , loadUser} = useUserStore();

    useEffect(() => {
        loadUser();
    },[]);
  return (
    <div>
  
      {user ? <Chat /> : <Welcome />}
    </div>
  )
}

export default Home
