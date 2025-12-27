import { Toaster } from "react-hot-toast"
import AppRoutes from "./AppRoutes"
import Scroll from "./components/Scroll"

function App() {
  return (
    <div>
    
      <Toaster position="top-center" toastOptions={{
        style: {
          background: "#ddd",
          padding: "14px",
          borderRadius: "5px",
        }
      }}/>
        <Scroll />
      <AppRoutes />
    </div>
  )
}

export default App
