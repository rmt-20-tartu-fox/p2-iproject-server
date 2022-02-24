const app = require("../app");
const request = require("supertest");
const { User } = require("../models");

const user1 = {
  email: "test@mail.com",
  username: "User Test",
  password: "usertest",
};

afterAll(done => {
  User.destroy({ truncate: true, cascade: true, restartIdentity: true})
    // .then(_ => {
    //   return Course.destroy({ truncate: true, cascade: true, restartIdentity: true})
    // })
    // .then(_ => {
    //   return MyCourse.destroy({ truncate: true, cascade: true, restartIdentity: true})
    // })
    .then(_ => {
      done();
    })
    .catch(err => {
      done(err);
    });
});

describe("User Routes Test", () => {
  describe("POST /users/register - create new user", () => {
    test("201 Success register - should create new User", (done) => {
      request(app)
        .post("/users/register")
        .send(user1)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          console.log(body)
          expect(status).toBe(201);
          expect(body).toHaveProperty("id", expect.any(Number));
          expect(body).toHaveProperty("username", user1.username);
          expect(body).toHaveProperty("email", user1.email);
          return done();
        });
    });

    test("400 Failed register - should return error if email is null", (done) => {
      request(app)
        .post("/users/register")
        .send({
          username: "User Test",
          password: "qweqwe",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          console.log(body, "<<<<")
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Email is Required");
          return done();
        });
    });

    test("400 Failed register - should return error if email is already exists", (done) => {
      request(app)
        .post("/users/register")
        .send(user1)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;
          // console.log(body)
          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Username Has Been Taken");
          return done();
        });
    });

    test("400 Failed register - should return error if wrong email format", (done) => {
      request(app)
        .post("/users/register")
        .send({
          email: "random",
          username: "Sample User",
          password: "qweqwe",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(400);
          expect(body).toHaveProperty("message", "Invalid Email Format");
          return done();
        });
    });
  });

  describe("POST /login - user login", () => {
    test("200 Success login - should return access_token", (done) => {
      request(app)
        .post("/users/login")
        .send(user1)
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(200);
          expect(body).toHaveProperty("access_token", expect.any(String));
          return done();
        });
    });

    test("401 Failed login - should return error", (done) => {
      request(app)
        .post("/users/login")
        .send({
          email: "hello@mail.com",
          password: "salahpassword",
        })
        .end((err, res) => {
          if (err) return done(err);
          const { body, status } = res;

          expect(status).toBe(401);
          expect(body).toHaveProperty("message", "Invalid Email or Password");
          return done();
        });
    });
  });
});
