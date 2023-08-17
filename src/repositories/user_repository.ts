import { apiClient } from "@/lib/api-client"
import { User } from "@/models/user_model"
import { sleep } from "@/utils/sleep"

export interface UserRepository {
  getUsers: () => Promise<User[]>,
  createUser: (user: Omit<User, 'id'>) => Promise<User>,
  deleteUser: (id: Pick<User, 'id'>) => void
}

const getUsers: UserRepository['getUsers'] = async (): Promise<User[]> => {
  await sleep(300) // for msw
  const { data } = await apiClient.get(`/users`)
  return data
}

const createUser = async (userData: Omit<User, 'id'>) => {
  const { data } = await apiClient.post(`/users`, {
    name: userData.name,
    belonging: userData.belonging
  })
  return data
}

const deleteUser: UserRepository['deleteUser'] = async (userData: Pick<User, 'id'>) => {
  await apiClient.delete(`/users/${userData.id}`)
}

export const userRepository: UserRepository = {
  getUsers,
  createUser,
  deleteUser
}