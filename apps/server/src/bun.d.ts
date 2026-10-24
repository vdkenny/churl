declare module "bun" {
    interface Env {
        JWT_SECRET: string;
        GITHUB_CLIENT_ID: string;
        GITHUB_CLIENT_SECRET: string;
        GITHUB_REDIRECT_URI: string;
    }
}
