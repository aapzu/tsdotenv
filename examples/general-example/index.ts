import { parse } from '../../index'

const SCHEMA = {
  BOOLEAN_ARRAY: Array(Boolean),
  BOOLEAN_FALSE: Boolean,
  BOOLEAN_TRUE: Boolean,
  ENUM: ['foo', 'bar'],
  NUMBER_ARRAY: Array(Number),
  NUMBER_FLOAT: Number,
  NUMBER_INT: Number,
  NUMBER_SCIENTIFIC: Number,
  STRING: String,
  STRING_ARRAY: Array(String),
  OPTIONAL_NUMBER: { type: Number, optional: true },
} as const

// These would usually be set somewhere else
process.env['BOOLEAN_FALSE'] = 'false'
process.env['NUMBER_ARRAY'] = '1,2,3,4'
process.env['NUMBER_SCIENTIFIC'] = '6.0221409e23'

const config = parse(SCHEMA)

type ExpectedSchemaType = {
  BOOLEAN_ARRAY: boolean[]
  BOOLEAN_FALSE: boolean
  BOOLEAN_TRUE: boolean
  ENUM: 'foo' | 'bar'
  NUMBER_ARRAY: number[]
  NUMBER_FLOAT: number
  NUMBER_INT: number
  NUMBER_SCIENTIFIC: number
  STRING: string
  STRING_ARRAY: string[]
  OPTIONAL_NUMBER?: number
}

const testType = (c: ExpectedSchemaType) => c
testType(config)

console.log(JSON.stringify(config, null, '  '))
