import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Input, Button } from 'antd'
import {useHistory} from 'react-router-dom'

import { postUpdated,selectPostById } from '@/store/slice/postSlice'
const {TextArea}=Input

export default function index ({ match: { params } }) {
  const { postId } = params
  const dispatch = useDispatch()
  const history = useHistory()
  // const post = useSelector(state => state.posts.find(v => v.id === postId))
  const post =useSelector(state=>selectPostById(state,postId))
  
  const [updatePostForm] = Form.useForm()
  const [title, setTitle] = useState(post.title)
  const [content,setContent]=useState(post.content)
  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleChangeContent = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = async() => {
    const values = await updatePostForm.validateFields()
    dispatch(postUpdated({
      id: postId,
      title,
      content
    }))
    history.push(`/posts/${postId}`)
  }
  return (
    <section className='add_posts'>
      <Form form={updatePostForm}>
        <Form.Item name='title' label='标题' rules={[{ required: true, message: '请输入标题' }]}>
          <Input placeholder='请输入标题' value={title} onChange={handleChangeTitle} />
        </Form.Item>
        <Form.Item name='content' label='内容' rules={[{ required: true, message: '请输入内容' }]}>
          <TextArea placeholder='请输入内容' value={content} onChange={handleChangeContent} ></TextArea>
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={handleSubmit}>提交</Button>
        </Form.Item>
      </Form>
    </section>
      
  )
}
