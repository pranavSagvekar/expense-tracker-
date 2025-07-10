import {   Routes , Route , BrowserRouter as Router} from "react-router-dom"
import Auth from "./Pages/Auth"
import Expense from "./Pages/Expense_Tracker/Expense"
import "./App.css"




function App() {

return (
    <>
    <Router>
      <Routes>
        <Route path="/" exact element={<Auth/>} />
        <Route path="/expense-tracker"  element = {<Expense/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
