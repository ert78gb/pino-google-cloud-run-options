import split from 'split2'
import writer from 'flush-write-stream'

export function once (emitter, name) {
	return new Promise((resolve, reject) => {
		if (name !== 'error')
			emitter.once('error', reject)

		emitter.once(name, (...args) => {
			emitter.removeListener('error', reject)
			resolve(...args)
		})
	})
}

export function sink (func) {
	const result = split((data) => {
		try {
			return JSON.parse(data)
		} catch (error) {
			console.log(error)
			console.log(data)
		}
	})
	if (func) result.pipe(writer.obj(func))
	return result
}
