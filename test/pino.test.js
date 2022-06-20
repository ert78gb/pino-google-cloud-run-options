import {test} from 'tap'
import pino from 'pino'
import options from '../lib/index.js'
import {once, sink} from './helper.js'

test('should initiate a new logger with the options', async ({ok}) => {
	const instance = pino(options)

	ok(instance)
})

const levelTestCases = [
	{pinoLevel: 'trace', googleLevel: 'DEBUG'},
	{pinoLevel: 'debug', googleLevel: 'DEBUG'},
	{pinoLevel: 'info', googleLevel: 'INFO'},
	{pinoLevel: 'warn', googleLevel: 'WARNING'},
	{pinoLevel: 'error', googleLevel: 'ERROR'},
	{pinoLevel: 'fatal', googleLevel: 'CRITICAL'},
]
for (const testCase of levelTestCases) {
	test(`should map ${testCase.pinoLevel} level to ${testCase.googleLevel}`, async ({equal}) => {
		const stream = sink()
		const instance = pino(options, stream)
		instance.level = 'trace'
		instance[testCase.pinoLevel]('message')

		const result = await once(stream, 'data')

		equal(result.severity, testCase.googleLevel)
	})
}

test('should name log level as severity', async ({hasOwnProp}) => {
	const stream = sink()
	const instance = pino(options, stream)
	instance.level = 'trace'
	instance.trace('message')

	const result = await once(stream, 'data')

	hasOwnProp(result, 'severity')
})

test('should not have level property', async ({notHas}) => {
	const stream = sink()
	const instance = pino(options, stream)
	instance.level = 'trace'
	instance.trace('message')

	const result = await once(stream, 'data')

	notHas(result, {level: 'trace'})
})

test('should name msg as message', async ({hasOwnProp}) => {
	const stream = sink()
	const instance = pino(options, stream)
	instance.level = 'trace'
	instance.trace('message')

	const result = await once(stream, 'data')

	hasOwnProp(result, 'message')
})

test('should not have msg property', async ({notHas}) => {
	const stream = sink()
	const instance = pino(options, stream)
	instance.level = 'trace'
	instance.trace('message')

	const result = await once(stream, 'data')

	notHas(result, {msg: 'message'})
})

test('should have timestamp property', async ({hasOwnProp}) => {
	const stream = sink()
	const instance = pino(options, stream)
	instance.level = 'trace'
	instance.trace('message')

	const result = await once(stream, 'data')

	hasOwnProp(result, 'timestamp')
})

test('should not have time property', async ({notOk}) => {
	const stream = sink()
	const instance = pino(options, stream)
	instance.level = 'trace'
	instance.trace('message')

	const result = await once(stream, 'data')

	notOk(result.time)
})
