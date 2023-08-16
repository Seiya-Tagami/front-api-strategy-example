import { apiClient } from "@/lib/api-client"
import { User } from "@/models/user_model"
import { sleep } from "@/utils/sleep"

export interface UserRepository {
  getUsers: () => Promise<User[]>
}

const getUsers: UserRepository['getUsers'] = async (): Promise<User[]> => {
  await sleep(300) // for msw
  const { data } = await apiClient(`/users`)
  return data
}

export const userRepository = {
  getUsers,
}