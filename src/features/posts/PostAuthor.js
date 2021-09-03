import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'

export const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId))

  return <span>By {author ? author.name : 'Unknown author'}</span>
}

// const [addRequestStatus, setAddRequestStatus] = useState('idle')
// const [someError, setSomeError] = useState(null)

// const onSavePostClicked = async () => {
//   if (canSave) {
//     try {
//       setAddRequestStatus('pending')
//       // unwrap just tell me, if the backend request or this action "addNewPost" is succeded or failed
//       await dispatch(addNewPost({ title, content, user: userId })).unwrap()
//       setTitle('')
//       setContent('')
//       setUserId('')
//     } catch (err) {
//       setSomeError(err)
//       console.error('Failed to save the post: ', err)
//     } finally {
//       setAddRequestStatus('idle')
//     }
//   }
// }

// if (addRequestStatus === 'pending') {
//   return (
//     <div>
//       <p> Please wait loading..</p>
//     </div>
//   )
// } else if (someError) {
//   console.log('error is: ' + someError)
//   return (
//     <div>
//       <p> Something went wrong </p>
//       <button
//         onClick={() => {
//           setSomeError('')
//         }}
//       >
//         Reload
//       </button>
//     </div>
//   )
// }
