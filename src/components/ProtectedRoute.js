import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const userEmail = useSelector((state) => {
    return state.user.userEmail
  })
  if (!userEmail) {
    return <Navigate to='/'></Navigate>
  } else {
    return children
  }
}

export default ProtectedRoute