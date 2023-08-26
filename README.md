# recogniz
Mini and rather simplified ERP api which should administer customers, products, inventories, warehoses. WIP

## Instalation

```bash
docker-compose build
```

```bash
docker-compose up -d
```

```bash
docker-compose exec -it recogniz.server bash
```

```bash
npx prisma generate
```

```bash
npx prisma migrate dev
```

```bash
npx prisma db seed
```

To seed the initial dev data.

Backend will run on http://localhost:3018

Client will run on http://localhost:8000

## Available API Endpoints

Test user:

email: test@gmail.com, password: test1234
