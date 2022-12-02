export function levelFormatter(_, number) {
	let severity
	switch (number) {
		case 10:
		case 20: {
			severity = 'DEBUG'
			break
		}

		case 30: {
			severity = 'INFO'
			break
		}

		case 40: {
			severity = 'WARNING'
			break
		}

		case 50: {
			severity = 'ERROR'
			break
		}

		case 60: {
			severity = 'CRITICAL'
			break
		}

		default: {
			severity = 'DEFAULT'
			break
		}
	}

	return {severity}
}

export function timestampFunction () {
	return `,"timestamp":"${new Date().toISOString()}"`
}

/**
 * @type { import('pino').LoggerOptions }
 */
const options = {
	base: undefined,
	formatters: {
		level: levelFormatter,
	},
	messageKey: 'message',
	timestamp: timestampFunction,
}

export default options
