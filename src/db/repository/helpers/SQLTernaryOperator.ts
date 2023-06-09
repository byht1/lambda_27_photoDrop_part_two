import { AnyColumn, SQL, sql } from 'drizzle-orm'

type TernaryOperator = {
  condition: AnyColumn
  isTrue: AnyColumn
  isFalse: AnyColumn
}

type SQLTernaryOperatorFn = <T>(
  condition: AnyColumn,
  isTrue: AnyColumn,
  isFalse: AnyColumn
) => SQL<T>

export const SQLTernaryOperator: SQLTernaryOperatorFn = (condition, isTrue, isFalse) => {
  return sql`CASE WHEN ${condition} IS NOT NULL THEN ${isTrue} ELSE ${isFalse} END`
}

type SQLTernaryOperatorIsBooleanFn = (condition: AnyColumn) => SQL<boolean>

export const SQLTernaryOperatorIsBoolean: SQLTernaryOperatorIsBooleanFn = (condition) => {
  return sql`CASE WHEN ${condition} IS NOT NULL THEN true ELSE false END`
}
