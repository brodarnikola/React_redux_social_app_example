import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'

import { useAddNewPostMutation } from '../api/apiSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const [addNewPost, { isLoading, error }] = useAddNewPostMutation()

  const users = useSelector(selectAllUsers)
  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const [someError, setSomeError] = useState(null)

  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        // unwrap just tell me, if the backend request or this action "addNewPost" is succeded or failed
        //await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        await addNewPost({ title, content, user: userId }).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        setSomeError(err)
        console.error('Failed to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  console.log('error before: ' + someError)
  console.log('status: ' + addRequestStatus)

  if (isLoading) {
    return (
      <div>
        <p> Please wait loading..</p>
      </div>
    )
  } else if (someError) {
    console.log('error is: ' + someError)
    return (
      <div>
        <p> Something went wrong </p>
        <p> {error.status} </p>
        <p> {error.data} </p>
        <button
          onClick={() => {
            setSomeError('')
          }}
        >
          Reload
        </button>
      </div>
    )
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value="">-</option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button
          type="button"
          onClick={() => onSavePostClicked()}
          disabled={!canSave}
        >
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
