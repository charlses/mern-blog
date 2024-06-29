import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateStart,
  updateSuccess,
  updateFailure
} from '../../context/user/userSlice'
import { RootState } from '../../context/store'

interface FormData {
  firstname?: string
  lastname?: string
  email?: string
  image?: string
  password?: string
}

export const useUpdate = () => {
  const {
    currentUser,
    isPending,
    error: errorMessage
  } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const updateUser = async (formData: FormData) => {
    dispatch(updateStart())

    try {
      const res = await fetch(`/api/users/${currentUser!._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message, {
          description: 'Failed to update user information'
        })
        dispatch(updateFailure(data.message))
        return
      } else {
        toast.success(data.message, {
          description: 'Your information has been changed!'
        })

        dispatch(updateSuccess(data.data))
        return data.data
      }
    } catch (error) {
      dispatch(updateFailure(error as string))
      toast.error('Something went wrong', { description: error as string })
    }
  }

  return { updateUser, isPending, errorMessage }
}
