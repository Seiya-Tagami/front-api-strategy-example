import { rest } from "msw";
import { v4 as uuidv4 } from 'uuid'

const users: Omit<User, 'id'>[] = [
  {
    name: "御坂美琴",
    belonging: "とある科学の超電磁砲"
  },
  {
    name: "司馬達也",
    belonging: "魔法科高校の劣等生"
  },
  {
    name: "早川アキ",
    belonging: "チェンソーマン"
  }
]

const createMock = () => {
  const mock_map = new Map()
  for (const v of users) {
    const id = uuidv4()
    const mock_user = {
      id,
      name: v.name,
      belonging: v.belonging
    }
    mock_map.set(id, mock_user)
  }
  return mock_map
}

const mock_map = createMock()


type User = {
  id: string
  name: string,
  belonging: string
}

export const handlers = [
  rest.get("/mock/users", (_, res, ctx) => {
    const mock_arr: User[] = []
    mock_map.forEach(v => {
      mock_arr.push({
        id: v.id,
        name: v.name,
        belonging: v.belonging
      })
    })
    return res(
      ctx.status(200),
      ctx.json(mock_arr)
    );
  }),
  rest.post<Omit<User, 'id'>>("/mock/users", async (req, res, ctx) => {
    const { name, belonging } = await req.json()
    const id = uuidv4()
    const newUser = {
      id,
      name,
      belonging
    }
    mock_map.set(id, newUser)
    return res(
      ctx.status(201),
      ctx.json(newUser)
    )
  }),
  rest.patch("/mock/users/:id", async (req, res, ctx) => {
    const { id } = req.params
    const { name, belonging } = await req.json()
    const updatedUser = {
      id,
      name,
      belonging
    }
    mock_map.set(id, updatedUser)
    return res(
      ctx.status(200),
      ctx.json(updatedUser)
    )
  }),
  rest.delete("/mock/users/:id", (req, res, ctx) => {
    const { id } = req.params
    if (id) mock_map.delete(id as string)

    return res(
      ctx.status(200)
    );
  })
];
