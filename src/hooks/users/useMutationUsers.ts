import { User, userFactory } from "@/models/user_model"
import { useMutation } from "@tanstack/react-query"
import { useError } from "../utils/userError"
import { queryClient } from "@/lib/api-client"

export const useMutationUsers = () => {
  const { switchErrorHandling } = useError()

  const createUserMutation = useMutation(
    (userData: Omit<User, 'id'>) => userFactory().post(userData),
    {
      onSuccess: (res) => {
        const previousUsers = queryClient.getQueryData<User[]>(["users"])
        if (previousUsers) {
          queryClient.setQueryData(['users'], [...previousUsers, res])
        }
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )

  const deleteUserMutation = useMutation(
    (userData: Pick<User, 'id'>) => userFactory().delete(userData),
    {
      onSuccess: (_, variables) => {
        const previousUsers = queryClient.getQueryData<User[]>(['users'])
        if (previousUsers) {
          queryClient.setQueryData(
            ['users'],
            previousUsers.filter((user) => user.id !== variables.id)
          )
        }
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )

  return {
    createUserMutation,
    deleteUserMutation,
  }
}