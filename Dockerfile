FROM oven/bun:latest

WORKDIR /app

COPY *.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

CMD ["bun", "run", "dev"]