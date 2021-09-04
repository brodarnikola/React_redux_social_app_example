import React from 'react'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor'
import { ReactionButtons } from './ReactionButtons'
import { TimeAgo } from './TimeAgo'
import { Spinner } from '../../components/Spinner'
import { useGetPostQuery } from '../api/apiSlice'

export const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const {
    data: post,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPostQuery(postId)

  let content
  if (isFetching) {
    content = <Spinner text="Loading..." />
  } else if (isError) {
    content = (
      <section>
        <div>{error.toString()}</div>
        <h2>Post not found!</h2>
      </section>
    )
  } else if (isSuccess) {
    content = (
      <section>
        <article className="post">
          <h2>{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <ReactionButtons post={post} />
          <Link
            style={{ marginRight: '30px' }}
            to={`/editPost/${post.id}`}
            className="button"
          >
            Edit Post
          </Link>
          <PostAuthor userId={post.user}></PostAuthor>
          <TimeAgo timestamp={post.postCreated} />
        </article>
      </section>
    )
  }
  return <section>{content}</section>
}
