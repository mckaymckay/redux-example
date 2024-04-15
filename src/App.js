import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import Posts from './pages/posts'
import SinglePostPage from './pages/posts/components/SinglePostPage'
import EditPostPage from './pages/posts/components/EditPostForm'
import UserPage from './pages/users/components/UserPage'
import UserList from './pages/users/components/UserList'


function App() {
  return (
    <Router basename="/src">
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/" component={Posts}/>
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/:userId" component={UserPage} />
          <Route exact path="/editPosts/:postId" component={EditPostPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
