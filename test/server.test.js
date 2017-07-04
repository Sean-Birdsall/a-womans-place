const request = require("supertest");
const expect = require("expect");

var app = require("../server").app;

describe('loading express server', function () {

  it("should respond with the home page", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .expect("Content-Type", /html/)
      .end(done);
  });

  it("404s bad addresses", (done) => {
    request(app)
      .get("/foo/bar")
      .expect(404)
      .end(done);
  });

  describe("getting to about page", function() {
    it("get's a 200", (done) => {
      request(app)
        .get("/#/about")
        .expect(200)
        .end(done);
    });
  });

});
