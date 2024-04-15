import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from '../../api/client'

const initialState = {
  users:[]
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
        // return action.payload
    })
  }
})

export const fetchUsers = createAsyncThunk
  ('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users')
    return response.data
})

export const {}=usersSlice.actions

export default usersSlice.reducer

export const selectAllUsers = (state => state.users.users)

export const selectUserById = (state,userId)=>state.users.users.find(v=>v?.id===userId)