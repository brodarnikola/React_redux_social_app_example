import React from 'react'
import { useSelector } from 'react-redux'
import { selectPosts } from './postsSlice'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'

export const PostList = () => {
  const posts5 = useSelector(selectPosts)
  console.log('size of list is: ' + posts5.length)

  const orderedPosts = posts5
    .slice()
    .sort((a, b) => b.postCreated.localeCompare(a.postCreated))

  //const posts7 = useSelector((state) => state.posts)
  const renderedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <TimeAgo timestamp={post.postCreated} />
      <ReactionButtons post={post} />
      <Link
        style={{ marginRight: '30px' }}
        to={`/posts/${post.id}`}
        className="button muted-button"
      >
        View Post
      </Link>
      <PostAuthor userId={post.userId}></PostAuthor>
    </article>
  ))
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
