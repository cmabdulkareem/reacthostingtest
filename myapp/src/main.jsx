import { StrictMode } from 'react'                  //importing strict mode debugging purpose
import { createRoot } from 'react-dom/client'       //import createRoot method from React library
import './index.css'                                //importing css file for styling
import App from './App'                             //importing app.jsx or app component.
import {BrowserRouter} from 'react-router-dom';     //import {BrowserRouter} from react-router-dom library
import 'bootstrap/dist/css/bootstrap.min.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
