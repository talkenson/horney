import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './rsuite.less'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Investigate } from '@/pages/Investigate'
import { MyProfile } from '@/pages/MyProfile'
import { EditProfile } from '@/pages/EditProfile'
import { LikesPage } from '@/pages/LikesPage'
import { RecoilRoot, useRecoilSnapshot } from 'recoil'
import { Profile } from '@/pages/Profile'
import { Auth } from '@/pages/Auth'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'

function DebugObserver() {
  const snapshot = useRecoilSnapshot()
  useEffect(() => {
    console.debug('The following atoms were modified:')
    for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
      console.debug(node.key, snapshot.getLoadable(node))
    }
  }, [snapshot])

  return null
}

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <DebugObserver />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Investigate />} />
            <Route path='me' element={<Profile />}>
              <Route index element={<MyProfile />} />
              <Route path='edit' element={<EditProfile />} />
            </Route>

            <Route path='likes'>
              <Route path=':profileId' element={<LikesPage />} />
              <Route index element={<LikesPage />} />
            </Route>

            <Route path='auth' element={<Auth />}>
              <Route index element={<Login />} />
              <Route path='register' element={<Register />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
)
