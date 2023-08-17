# Frontend Api Strategy

### 技術スタック

- axios
- TanStack Query (React Query)
- Mock Service Worker

### ディレクトリ構成(src 配下)

```
src/
├── hooks
│   ├── users
│   │   ├── useMutationUsers.ts
│   │   └── useQueryUsers.ts
│   └── utils
│       └── userError.ts
├── lib
│   ├── api-client.ts
│   └── mock
│       ├── browser.ts
│       ├── handlers.ts
│       ├── server.ts
│       └── worker.ts
├── models
│   └── user_model.ts
├── pages
│
├── repositories
│   └── user_repository.ts
└── utils
```

### 始め方

1. 必要なモジュールをインストール

```bash
$ pnpm i
```

2. `.env.example` をコピーして`.env`に書き換える。

3. プロジェクト起動 & msw 起動

```bash
$ pnpm run dev
```

4. ブラウザのコンソールで`[MSW] Mocking enabled.`となっているか確認する。

### 参考記事

- TanStack Query  
  https://zenn.dev/t_keshi/articles/react-query-prescription
- デザインパターン  
  https://zenn.dev/sutamac/articles/27246dfe1b5a8e
