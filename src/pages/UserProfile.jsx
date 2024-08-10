import React, { useContext, useEffect, useState } from "react";
import UserService from "../API/UserService"
import { useFetching } from "../hooks/useFetching";
import Loader from "../components/Ui/Loader/Loader";
import { AuthContext } from "../context";
import '../styles/Profile.css'

const UserProfile = (props) => {
  const [user, setUser] = useState({})
  const { token } = useContext(AuthContext)

  const [fetchUser, isUserLoading, userError] = useFetching(async () => {
    const response = await UserService.getById(token);
    setUser(() => {
      const responseUser = response.data
      return responseUser
    })
  })

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className="profile">
      {isUserLoading ?
        (<div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>)
        : (<>
          <img className='profile-image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtuphMb4mq-EcVWhMVT8FCkv5dqZGgvn_QiA&s" alt="" />
          <div>Last name: {user.last_name}</div>
          <div>First name: {user.first_name}</div>
          <div>Email: {user.email}</div>
          <div>Registered: {user.created_at?.slice(0, 10)}</div>
        </>)
      }
    </div>
  );
}

export default UserProfile;