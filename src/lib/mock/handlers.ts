import { User } from "@/models/user_model";
import { rest } from "msw";

const mock_map = new Map([
  ['0',
    {
      id: '0',
      name: "御坂美琴",
      belonging: "とある科学の超電磁砲"
    },
  ],
  ['1',
    {
      id: '1',
      name: "司馬達也",
      belonging: "魔法科高校の劣等生"
    },
  ],
  ['2',
    {
      id: '2',
      name: "早川アキ",
      belonging: "チェンソーマン"
    },
  ],
])

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
  rest.delete("/mock/users", (req, res, ctx) => {
    const id = req.url.searchParams.get('id')
    // if (id) mock_map.delete(id)

    return res(
      ctx.status(204)
    );
  })
];
