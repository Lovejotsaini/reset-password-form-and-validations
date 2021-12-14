import React from 'react'
import ResetPass from './auth/ResetPass'
import ConfirmPass from './auth/ConfirmPas'

import "./index.css"
import {
  Routes,
  Route,
} from "react-router-dom";




const App = (props) => {

  return (
    <div>
     
      <Routes>
      <Route exact={true} path="/resetpassword" element={<ResetPass />}>
        </Route>
        <Route exact={true} path="/confirmpassword" element={<ConfirmPass />}>
        </Route>
      </Routes>
    </div>







  )
}
export default App;
