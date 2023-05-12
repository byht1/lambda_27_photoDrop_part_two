import * as dotenv from 'dotenv'

dotenv.config()

type ToNumberEnvKey =
  | 'PORT'
  | 'MAX_VERIFICATION_CODE_REGENERATIONS'
  | 'VERIFICATION_CODE_EXPIRY_TIME'

type TEnvKey =
  | 'DB_URL'
  | 'TELEGRAM_CHAT_ID'
  | 'TELEGRAM_BOT_TOKEN'
  | 'TOKEN_SECRET_KEY'
  | 'AWS_S3_BUCKET'
  | 'AWS_S3_ACCESS_KEY'
  | 'AWS_S3_KEY_SECRET'

type ResponseGetEnv<T> = T extends ToNumberEnvKey ? number : string

const envNumberToArray = [
  'PORT',
  'MAX_VERIFICATION_CODE_REGENERATIONS',
  'VERIFICATION_CODE_EXPIRY_TIME',
]

export const getEnv = <T extends TEnvKey | ToNumberEnvKey>(
  envKey: T,
  defaultValue = ''
): ResponseGetEnv<T> => {
  const value = process.env[envKey]
  const response = value ? value : defaultValue

  if (envNumberToArray.includes(envKey)) {
    return +response as ResponseGetEnv<T>
  }

  return response as ResponseGetEnv<T>
}
