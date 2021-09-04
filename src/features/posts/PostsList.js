import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { TimeAgo } from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import { Spinner } from '../../components/Spinner'

import { useGetPostsQuery } from '../api/apiSlice'

const PostData = ({ post }) => {
  //const post = useSelector((state) => selectPostById(state, postId))
  //console.log('post id: ' + post.id)
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
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery()

  console.log('will that be called again')
  const sortedPosts = useMemo(() => {
    console.log('7777 will that be called again')
    const sortedPosts = posts.slice()
    // Sort posts in descending chronological order
    return sortedPosts.sort((a, b) => b.date.localeCompare(a.date))
  }, [posts])

  //const posts5 = useSelector(selectAllPosts)
  //console.log('size of list is: ' + posts.length)

  // useEffect(() => {
  //   if (postStatus === 'idle') {
  //     const dataResponse = dispatch(fetchPosts())

  //     console.log('55 size of list is: ' + dataResponse.length)
  //   }
  //   return () => {
  //     console.log(
  //       'This cleanup will be executed every time, a component re-render'
  //     )
  //   }
  // }, [postStatus, dispatch])

  let content
  if (isLoading) {
    content = <Spinner text="Loading" />
  } else if (isSuccess) {
    const renderedPosts = sortedPosts.map((post) => (
      <PostData key={post.id} post={post} />
    ))

    content = renderedPosts
  } else if (isError) {
    content = (
      <div>
        {error.error} <br />
        {error.toString()}
      </div>
    )
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
      {/*  {renderedPosts} */}
    </section>
  )
}
