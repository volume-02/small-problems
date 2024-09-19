// Write a function makeRequests that takes an array of URLs and a number indicating the maximum number of simultaneous requests.

// Conditions:
// No more than the specified number of requests should be processed at the same time.
// The function should return an array of results in the same order as the input URLs.
// Duplicate URLs should not trigger duplicate requests, but the result should still appear in the final array.

const urls = [
    'http://api/v1/1',
    'http://api/v1/1',
    'http://api/v1/2',
    'http://api/v1/4',
    'http://api/v1/3',
    'http://api/v1/4',
    'http://api/v1/3',
    'http://api/v1/4',
    'http://api/v1/3',
    'http://api/v1/5',
];

// [1, 1, 2, 4, 3, 4, 3, 4, 3, 5];

function myFetch(url) {
    const time = Math.floor(Math.random() * 5) + 1;
    console.log(`start request ${url} with time ${time}`);
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(
                `end request ${url} with time ${time}, response - ${url.slice(
                    -1,
                )}`,
            );
            resolve(url.slice(-1));
        }, time * 1000);
    });
}

const makeRequests = async (urls, limit = 2) => {
    let doneNumber = 0;
    let currIndex = limit - 1;
    const respDict = {};

    await new Promise((resolve) => {
        const addRequests = (idx) => {
            if (idx > urls.length - 1) return;

            if (respDict.hasOwnProperty(urls[idx])) {
                doneNumber++;
                currIndex++;
                addRequests(currIndex);
                return;
            }
            respDict[urls[idx]] = undefined;
            myFetch(urls[idx]).then((res) => {
                respDict[urls[idx]] = res;
                doneNumber++;

                if (doneNumber === urls.length) {
                    resolve();
                    return;
                }
                currIndex++;
                addRequests(currIndex);
            });
        };

        for (let i = 0; i < limit; i++) {
            addRequests(i);
        }
    });

    return urls.map((url) => respDict[url]);
};

makeRequests(urls, 3).then(console.log);

async function makeRequests2(urls, limit = 2) {
    const uniqueUrls = new Set(urls);
    const resultsMap = new Map();

    const fetchUrl = async (url) => {
        if (!resultsMap.has(url)) {
            const result = await myFetch(url);
            resultsMap.set(url, result);
        }
        return resultsMap.get(url);
    };

    const processQueue = async (queue) => {
        const chunk = queue.splice(0, limit);
        if (chunk.length === 0) return;

        await Promise.all(chunk.map(fetchUrl));
        await processQueue(queue);
    };

    await processQueue([...uniqueUrls]);

    return urls.map((url) => resultsMap.get(url));
}

makeRequests2(urls, 3).then(console.log);
