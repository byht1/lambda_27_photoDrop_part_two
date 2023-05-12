import { AnyColumn, SQL, sql } from 'drizzle-orm'

type TJsonAggBuildObject = <T extends { [key: string]: any }>(shape: {
  [K in keyof T]: AnyColumn | SQL
}) => SQL<T[]>

export const jsonAggBuildObject: TJsonAggBuildObject = (shape) => {
  const chunks: SQL[] = []

  Object.entries(shape).forEach(([key, value]) => {
    if (chunks.length > 0) {
      chunks.push(sql.raw(`,`))
    }
    chunks.push(sql.raw(`'${key}',`))
    chunks.push(sql`${value}`)
  })

  return sql`COALESCE(
    json_agg(
      json_build_object(${sql.fromList(chunks)})
    ), '[]'
  )`
}
