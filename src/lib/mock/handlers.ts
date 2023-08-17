import { rest } from "msw";
import { v4 as uuidv4 } from 'uuid'

const users: User[] = [
  {
    id: '',
    name: "御坂美琴",
    belonging: "とある科学の超電磁砲"
  },
  {
    id: '',
    name: "司馬達也",
    belonging: "魔法科高校の劣等生"
  },
  {
    id: '',
    name: "早川アキ",
    belonging: "チェンソーマン"
  }
]

const createMock = () => {
  const mock_map = new Map()
  for (const v of users) {
    const id = uuidv4()
    v.id = id
    mock_map.set(id, v)
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
      id: id,
      name,
      belonging
    }
    mock_map.set(id, newUser)
    return res(
      ctx.status(201),
      ctx.json(newUser)
    )
  }),
  rest.delete("/mock/users/:id", (req, res, ctx) => {
    const { id } = req.params
    if (id) mock_map.delete(id as string)

    return res(
      ctx.status(204)
    );
  })
];
