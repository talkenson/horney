import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Investigate } from '@/pages/Investigate'
import { MyProfile } from '@/pages/MyProfile'
import { LikesPage } from '@/pages/LikesPage'
import { RecoilRoot } from 'recoil'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Investigate />} />
            <Route path='me' element={<MyProfile />} />

            <Route path='likes'>
              <Route path=':profileId' element={<LikesPage />} />
              <Route index element={<LikesPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
)
