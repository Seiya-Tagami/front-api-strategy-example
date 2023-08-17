import { apiClient } from "@/lib/api-client"
import { User } from "@/models/user_model"
import { sleep } from "@/utils/sleep"

export interface UserRepository {
  getUsers: () => Promise<User[]>,
  createUser: (userData: Omit<User, 'id'>) => Promise<User>,
  updateUser: (userData: User) => Promise<User>,
  deleteUser: (userData: Pick<User, 'id'>) => void
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

const updateUser = async (userData: User) => {
  const { data } = await apiClient.patch(`/users/${userData.id}`, {
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
  updateUser,
  deleteUser
}