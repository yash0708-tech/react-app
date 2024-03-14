import { Amplify } from 'aws-amplify';
import config from './amplifyconfiguration.json';
Amplify.configure(config);

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home'
import Register from './components/Register';
import Api from './components/Api';
import Update from './components/Update';


function App() {
  

  return (
    <>
    
      <Router>
      
        <Routes>
          <Route  path="/" element={<Home/>} >
            <Route path="register" element={<Register/>} />
            <Route path="api" element={<Api/>} />
            <Route path="update" element={<Update/>} />
          </Route>
          
        </Routes>
      
    </Router>
    </>
  )
}

export default App
