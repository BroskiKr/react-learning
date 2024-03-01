import React from "react";
import PostItem from "./PostItem";
import { TransitionGroup, CSSTransition } from "react-transition-group";


const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return (
      <h1 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '700' }}>Користувача не знайдені</h1>
    )
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }} className='title'>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) =>
          <CSSTransition
            key={post.id}
            timeout={500}
            classNames="post"
          >
            <PostItem remove={remove} number={index + 1} post={post} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  )
}

export default PostList;