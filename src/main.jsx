import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/index.js'
import {PersistGate} from 'redux-persist/integration/react'
import {persistor} from './store/index.js'
import { Provider } from 'react-redux'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor} >
      <Routes>
            <Route path='/*' element={<App/>}/>
      </Routes>
      </PersistGate>

      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
