import { User, userFactory } from "@/models/user_model"
import { useMutation } from "@tanstack/react-query"
import { useError } from "../utils/userError"
import { queryClient } from "@/lib/api-client"

export const useMutationUsers = () => {
  const { switchErrorHandling } = useError()

  const deleteUserMutation = useMutation(
    (id: string) => userFactory().delete(id),
    {
      onSuccess: (_, variables) => {
        const previousUsers = queryClient.getQueryData<User[]>(['users'])
        if (previousUsers) {
          queryClient.setQueryData(
            ['users'],
            previousUsers.filter((user) => user.id !== variables)
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
    deleteUserMutation,
  }
}