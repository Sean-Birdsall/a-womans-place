const request = require("supertest");

// var app = require("./server").app;
var app = require("../server").app;

it("should return response", (done) => {
  request(app)
    .get("/")
    .expect("Content-Type", /html/)
    .end(done);
});
