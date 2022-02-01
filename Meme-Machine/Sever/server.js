var http = require("http");
var sampleDb = {
    124: "123",
};
var server = http.createServer(function(req, res) {
    switch (req.url) {
        case "/login":
            {
                let postData = "";
                req.on("data", (chunk) => {
                    postData += chunk;
                });
                req.on("end", () => {
                    postData = JSON.parse(postData);

                    if (
                        sampleDb.hasOwnProperty(postData.userName) &&
                        sampleDb[postData.userName] === postData.password
                    ) {
                        res.writeHead(200, "Success", { "Access-Control-Allow-Origin": "*" });
                        res.end("Success1123");
                    } else {
                        res.writeHead(404, "Unauthorized", {
                            "Access-Control-Allow-Origin": "*",
                        });
                        res.end("Unauthorized123");
                    }
                });
                break;
            }
        case "/register":
            {
                let postData = "";
                req.on("data", (chunk) => {
                    postData += chunk;
                });
                req.on("end", () => {
                    postData = JSON.parse(postData);

                    if (sampleDb.hasOwnProperty(postData.userName)) {
                        res.writeHead(201, "User Already Exsists", {
                            "Access-Control-Allow-Origin": "*",
                        });
                        res.end("User Already Exsists");
                    } else {
                        sampleDb[postData.userName] = postData.password;
                        res.writeHead(200, "Success", {
                            "Access-Control-Allow-Origin": "*",
                        });
                        res.end("Success");
                    }
                });
                break;
            }
        default:
            {
                res.writeHead(404, "Unauthorized", {
                    "Access-Control-Allow-Origin": "*",
                });
                res.end("Unauthorized123");
                break;
            }
    }
});

server.listen(7777);

console.log("Node.js web server at port 7777 is running..");