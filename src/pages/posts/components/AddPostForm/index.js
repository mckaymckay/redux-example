import React, { useState } from 'react'
import { Form, Input, Button, Select} from 'antd'

import './index.css'
import { useDispatch,useSelector } from 'react-redux'
import { postAdded, addNewPost } from '@/store/slice/postSlice'

// import { postAdded } from '@/store/slice/postSlice'
import { nanoid } from '@reduxjs/toolkit'

const  {TextArea} = Input

export default function index () {
  const [addPostForm] = Form.useForm()
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [user, setUser] = useState()

  const titleChange = (e) => {
    setTitle(e.target.value)
  }
  const contentChange = (e) => {
    setContent(e.target.value)
  }
  const userChange = (value) => {
    setUser(value)
  }
  const handleSubmit =async () => {
    const values = await addPostForm.validateFields()

    if (title && content && user) {
      dispatch(addNewPost(
        // id: nanoid(),  // createSlice中定义了prepare函数，返回包含payload的字段对象
        title,
        content,
        user,
      ))
      addPostForm.resetFields()
    }
}
  return (
    <section className='add_posts'>
      <Form form={addPostForm}>
        <Form.Item label='文章标题' name='postTitle' rules={[{ required: true, message: '请输入文章标题' }]}>
          <Input placeholder="请输入文章标题" value={title} onChange={titleChange}/>
        </Form.Item>
        <Form.Item label='文章内容' name='postContent' rules={[{ required: true, message: '请输入文章内容' }]}>
          <TextArea placeholder="请输入文章内容" value={content} onChange={contentChange}/>
        </Form.Item>
        <Form.Item label='作者' name='user' rules={[{ required: true, message: '请输入作者' }]}>
          <Select
            value={user}
            options={users}
            placeholder='请选择作者'
            fieldNames={{ label: 'name', value: 'id' }}
            onChange={userChange}
          />      
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={handleSubmit}>发布</Button>
        </Form.Item>
      </Form>
    </section>
  )
}
