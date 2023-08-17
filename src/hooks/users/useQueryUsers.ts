import { User, userFactory } from '@/models/user_model'
import { useQuery } from '@tanstack/react-query'
import { useError } from '../utils/userError'


export const useQueryUsers = () => {
  const { switchErrorHandling } = useError()

  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: () => userFactory().index(),
    staleTime: Infinity,
    onSuccess: () => console.log(`fetch success`),
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
}