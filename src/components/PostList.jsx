import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, title, remove }) => {
  if (!posts.length) {
    return (
      <h1 style={{ textAlign: 'center', fontSize: '36px', fontWeight: '700' }}>Разраби підараси</h1>
    )
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }} className='title'>{title}</h1>
      {posts.map((post, index) =>
        <PostItem remove={remove} number={index + 1} post={post} key={post.id} />
      )}
    </div>
  )
}

export default PostList;