<div align="center">
    <img src="https://raw.githubusercontent.com/vdkenny/churl/main/docs/preview.avif" width="400" height="auto" alt="preview"/>
</div>

<h4 align="center">🐜 chico [chee-koh] - small in Spanish.</h4>

## Getting Started

The fastest way to get started locally:

```sh
# 1. Start PostgreSQL in Docker
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

# 2. Set env variables
cp apps/server/.env.example apps/server/.env
cp apps/churl.dev/.env.example apps/churl.dev/.env

bun run --filter "*" dev
```

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
