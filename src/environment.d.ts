declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URL: string
      NEXT_PUBLIC_SERVER_URL: string
      VERCEL_PROJECT_PRODUCTION_URL: string
      RESEND_API_KEY: string
      EMAIL_FROM: string
      EMAIL_FROM_NAME: string
      BLOB_READ_WRITE_TOKEN: string
      UPSTASH_REDIS_REST_KV_REST_API_URL: string
      UPSTASH_REDIS_REST_KV_REST_API_TOKEN: string
      UPSTASH_REDIS_REST_KV_REST_API_READ_ONLY_TOKEN: string
      OPENROUTER_API_KEY: string
      CHAT_MODEL: string
      CRON_SECRET: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
