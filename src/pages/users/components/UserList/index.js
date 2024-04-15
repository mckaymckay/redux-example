import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { selectAllUsers } from '../../../../store/slice/usersSlice'
import UserPage from '../UserPage'


export default function UserList () {
  const users = useSelector(selectAllUsers)

  return (
    <div>
      UserList
      {
        users?.map(user=> (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))
      }
      <UserPage></UserPage>
    </div>
  )
}
