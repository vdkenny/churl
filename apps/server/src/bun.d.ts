declare module "bun" {
    interface Env {
        DATABASE_URL: string;
        JWT_SECRET: string;

        GITHUB_CLIENT_ID: string;
        GITHUB_CLIENT_SECRET: string;
        GITHUB_REDIRECT_URI: string;

        HOME_URL: string;
    }
}
