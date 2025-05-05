# 線上點餐系統

這是一個使用 Nuxt 3 和 Tailwind CSS 開發的線上點餐系統，此系統需要搭配 [POS](https://github.com/brianchou452/pos) 專案一起使用。

## Setup

這個專案使用 pnpm 作為套件管理工具，並且使用 pnpm 來安裝相依套件。請確保你已經安裝了 Node.js 和 pnpm。

```bash
pnpm install
```

## Development

這個專案需要設定環境變數供 Firebase 服務使用，請參考 `.env.example` 檔案並建立 `.env` 檔案，然後填入相應的環境變數。

> [!NOTE]  
> 這個專案使用的 Firebase 專案和 POS 專案是同一個專案，因此請確保你在 `.env` 檔案中填入正確的 Firebase 專案 ID 和 API 金鑰。

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```
