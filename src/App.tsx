import { Route, Routes } from "react-router-dom"
import { Landing } from "./pages/Landing"
import { Dashboard } from "./pages/DashBoard"


function App() {

  return (
    <>


      <Routes>
        <Route path="/" element={    <Landing/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App
