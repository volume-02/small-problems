// It is necessary to implement the function retry, which takes two parameters:
// 1. An asynchronous function
// 2. config: { count: number, delay: (count) => number }

// If the asynchronous function returns a promise in the rejected state,
// the function must be restarted config.count times with a delay of config.delay ms,
// until the promise either resolves (fulfilled) or the number of possible attempts config.count is exhausted.
// The retry function should return a promise.

let count = 0;

function test() {
    count++;
    return new Promise((resolve, reject) => {
        if (count > 3) return resolve('Resolved');
        setTimeout(() => reject('Hello World Error'), 1000);
    });
}

retry(test, { count: 5, delay: (retryCount) => retryCount * 1000 })
    .then((res) => console.log('res', res))
    .catch((err) => console.log('err', err));

function retry(promiseFn, config) {
    let count = 0;

    return new Promise((resolve, reject) => {
        const handleError = (err) => {
            if (count >= config.count) {
                return reject('retry exceeded ' + err);
            }
            count++;
            console.error('Rejected. Retry: ' + count);
            setTimeout(fireFn, config.delay(count));
            return;
        };

        const fireFn = () => {
            try {
                promiseFn()
                    .then((res) => resolve(res))
                    .catch(handleError);
            } catch (err) {
                handleError(err);
            }
        };

        fireFn();
    });
}
