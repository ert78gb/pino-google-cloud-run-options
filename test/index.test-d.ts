import { LoggerOptions } from 'pino'
import { expectType } from 'tsd'
import options from '../lib'

expectType<LoggerOptions>(options)
