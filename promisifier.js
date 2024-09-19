import https from "https";

function makeRequest(url, callback) {
    https
        .get(url, (res) => {
            let data = "";

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                if (res.statusCode === 200) {
                    callback(null, data);
                } else {
                    callback(
                        new Error(
                            "Request failed with status " + res.statusCode
                        )
                    );
                }
            });
        })
        .on("error", (err) => {
            callback(err);
        });
}

const url = "https://jsonplaceholder.typicode.com/posts/1";

makeRequest(url, function (error, data) {
    if (error) {
        console.error("cb error:", error);
    } else {
        console.log("cb data:", data);
    }
});

const promisify = (fn) => {
    return (url) =>
        new Promise((resolve, reject) => {
            fn(url, (error, data) => {
                if (error) {
                    return reject(error);
                }
                if (data) {
                    return resolve(data);
                }
            });
        });
};

const pFn = promisify(makeRequest);

pFn(url)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
