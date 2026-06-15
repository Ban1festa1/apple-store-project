# Apple Store Project

Проект реализован на **Vue 3 + Vite** с использованием роутинга, сервисов для получения данных с backend-сервера, страниц каталога, товара, корзины и избранного.

## Стек технологий

* Vue 3
* Vite
* Vue Router
* JavaScript
* HTML
* CSS
* Backend API

## Функциональность

В проекте реализовано:

* главная страница по макету;
* страница каталога товаров;
* страница детального просмотра товара;
* корзина товаров;
* избранные товары;
* поиск/фильтрация товаров по бренду;
* сортировка товаров;
* пагинация товаров;
* добавление товаров в корзину;
* добавление товаров в избранное;
* получение данных с backend-сервера;
* роутинг между страницами;
* хранение данных корзины и избранного через localStorage.

## Страницы проекта

| Страница                  | URL            |
| ------------------------- | -------------- |
| Главная                   | `/`            |
| Каталог товаров           | `/products`    |
| Детальная страница товара | `/product/:id` |
| Корзина                   | `/cart`        |
| Избранное                 | `/favorites`   |

## Структура проекта

```text
apple-store-project/
├── backend/
│   ├── dist/
│   ├── prisma/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── router/
│   │   ├── services/
│   │   ├── store/
│   │   ├── App.vue
│   │   ├── main.js
│   │   └── style.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Запуск проекта

Для работы проекта нужно запустить отдельно backend и frontend.

### 1. Запуск backend

Перейти в папку backend:

```bash
cd backend
```

Установить зависимости:

```bash
npm install
```

Запустить сервер:

```bash
DATABASE_URL=file:./dev.db node dist/index.js
```

Для Windows PowerShell:

```powershell
$env:DATABASE_URL="file:./dev.db"; node dist/index.js
```

Backend будет доступен по адресу:

```text
http://localhost:1452
```

Проверка API:

```text
http://localhost:1452/api/products/
```

### 2. Запуск frontend

Открыть второй терминал и перейти в папку frontend:

```bash
cd frontend
```

Установить зависимости:

```bash
npm install
```

Запустить frontend:

```bash
npm run dev
```

Frontend будет доступен по адресу:

```text
http://localhost:5173
```

## Backend

В проекте используется backend-сервер из задания:

```text
https://github.com/Arsen4ik/apple-store-backend/tree/build
```

Данные товаров получаются через API backend-сервера.

## Примечание

Для корректной работы frontend необходимо, чтобы backend был запущен на порту `1452`.
