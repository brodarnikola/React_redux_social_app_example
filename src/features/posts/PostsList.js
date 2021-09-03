import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from './postsSlice'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { Spinner } from '../../components/Spinner'

const PostData = ({ post }) => {
  console.log('post id: ' + post.id)
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
      <Link
        style={{ marginRight: '30px' }}
        to={`/posts/${post.id}`}
        className="button muted-button"
      >
        View Post
      </Link>
      <PostAuthor userId={post.user}></PostAuthor>
    </article>
  )
}

export const PostsList = () => {
  const dispatch = useDispatch()

  const postStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  const posts5 = useSelector(selectAllPosts)
  console.log('size of list is: ' + posts5.length)

  useEffect(() => {
    if (postStatus === 'idle') {
      const dataResponse = dispatch(fetchPosts())

      console.log('55 size of list is: ' + dataResponse.length)
    }
    return () => {
      console.log(
        'This cleanup will be executed every time, a component re-render'
      )
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === 'loading') {
    content = <Spinner text="Loading" />
  } else if (postStatus === 'succeeded') {
    const orderedPosts = posts5
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => <PostData key={post.id} post={post} />)
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
      {/*  {renderedPosts} */}
    </section>
  )
}
