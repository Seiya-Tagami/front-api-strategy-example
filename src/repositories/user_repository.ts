import { apiClient } from "@/lib/api-client"
import { User } from "@/models/user_model"
import { sleep } from "@/utils/sleep"

export interface UserRepository {
  getUsers: () => Promise<User[]>,
  deleteUser: (id: Pick<User, 'id'>) => void
}

const getUsers: UserRepository['getUsers'] = async (): Promise<User[]> => {
  await sleep(300) // for msw
  const { data } = await apiClient.get(`/users`)
  return data
}

const deleteUser: UserRepository['deleteUser'] = async (id: Pick<User, 'id'>) => {
  console.log(id)
  await apiClient.delete(`/users/${id}`)
}

export const userRepository: UserRepository = {
  getUsers,
  deleteUser
}