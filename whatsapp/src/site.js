import SignIn from "./sign-in/SignIn"
import SignUp from "./signUp/SignUp"
import { useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Chat from "./chat/chat"
import { useRef } from 'react'

function Site() {
  // hook for the users list
  const [users, setUsers] = useState([])
  // hook to save the username of the signed in user
  const [user, setUser] = useState(null)
  const middleElement = useRef(null)
  return (
    <div className="middle-area" ref={middleElement}>
      {/* created rouths for each page, each routh has a component */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<SignIn users={users} setUser={setUser} />}
          />
          <Route
            path="/signup"
            element={<SignUp users={users} setUsers={setUsers} />}
          />
          {/* set user to null to return to sign in */}
          <Route
            path="/chat"
            element={user ? <Chat user={user} setUser={setUser} middleElement={middleElement} /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default Site