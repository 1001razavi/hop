class TimeoutError extends Error {}

export async function promiseTimeout<T> (promise: Promise<T>, timeout: number): Promise<T> {
  return new Promise((resolve, reject) => {
    let timedout = false
    const t = setTimeout(() => {
      timedout = true
      reject(new TimeoutError('timedout'))
    }, timeout)

    // make it a promise if it's not one
    Promise.resolve(promise)
      .then((result: T) => {
        clearTimeout(t)
        if (!timedout) {
          resolve(result)
        }
      })
      .catch((err: any) => {
        clearTimeout(t)
        if (!timedout) {
          reject(err)
        }
      })
  })
}
