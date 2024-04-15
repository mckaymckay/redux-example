import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './slice/postSlice'
import usersSlice from './slice/usersSlice'

// state对象有一个‘posts’的字段，并且state.posts的所有数据都将在dispatch action时由postsReducer函数更新
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersSlice,
  },
})
