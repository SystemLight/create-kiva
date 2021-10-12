const path = require("path");

const bodyParser = require("body-parser");
const Mock = require("mockjs");

const mockDir = path.join(process.cwd(), "mock");

function registerRoutes(app) {
    const {mocks} = require("./index.js");
    const mocksForServer = mocks.map((route) => {
        return responseFake(route.url, route.type, route.response);
    });
    for (const mock of mocksForServer) {
        // 等同于app.get('url',function(req,res){})
        app[mock.type](mock.url, mock.response);
    }
}

function unregisterRoutes() {
    Object.keys(require.cache).forEach(i => {
        if (i.includes(mockDir)) {
            delete require.cache[require.resolve(i)];
        }
    });
}

// for mock server
const responseFake = (url, type, respond) => {
    return {
        url: new RegExp(url),
        type: type || "get",
        response(req, res) {
            console.log("request invoke:" + req.path);
            res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond));
        }
    };
};

module.exports = (app) => {
    // parse app.body
    // https://expressjs.com/en/4x/api.html#req.body
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    registerRoutes(app);
};
