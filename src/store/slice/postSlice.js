/**
 * 处理文章数据的reducer函数
 *  */ 

import { createSlice, nanoid, createAsyncThunk} from "@reduxjs/toolkit";
import dayjs from 'dayjs'
import { client } from '@/api/client'
import {FETCH_STASUS_PEDDING, FETCH_STASUS_FULFILLED, FETCH_STASUS_ERROR} from '@/constant'

// 初始数据，程序启动时redux store会加载这些值
const initialState = {
  posts: [],
  status: FETCH_STASUS_PEDDING,
  error: null
}

// createSlice 可以创建reducer和相关的action
// reducer函数：知道如何处理数据
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // 增加 post
    postAdded: {
      reducer (state, action) {
        state.posts.push(action.payload)
      },
      prepare(title,content,userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: dayjs().format('YYYY-MM-DD HH:mm:ss')
          }
        }
      }
    },
    // 更新 post
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const post = state.posts.find(v => v.id === id)
      if (post) {
        post.title = title
        post.content = content
      }
    },
   
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status=FETCH_STASUS_PEDDING
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = FETCH_STASUS_FULFILLED
        // 将获取的帖子添加到 state.posts
        state.posts = action.payload
        /**
         * immer让我们以两种方式更新状态：要么mutate现有状态值，要么return一个新结果。如果我们返回一个新值，他将用我们返回的任何内容完全替换现有状态。
         */
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = FETCH_STASUS_ERROR
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
    })
  }
})

// 使用 createAsyncThunk 进行异步请求
// ？？？ createAsyncThunk API 生成 thunk，为你自动 dispatch 那些 "start/success/failure" action
// 获取posts列表
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await client.get('/fakeApi/posts')
  return res.data
})

// 新增post
export const addNewPost = createAsyncThunk('posts/addNewPost', async (params) => {
  const response = await client.post('/fakeApi/posts', params)
    // 响应包括完整的帖子对象，包括唯一 ID
    return response.data
})


export const {
  postAdded,
  postUpdated
}=postsSlice.actions

export default postsSlice.reducer

// 导出selector函数， 方便组件使用
export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)