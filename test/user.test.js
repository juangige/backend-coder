import { expect } from "chai";
import supertest from "supertest";
import { config } from "../src/config/config.js";

const requester = supertest(`http://localhost:${config.PORT}/api`);

describe("Test usuarios", () => {
  let authToken;
  let userId;

  // body login de admin
  const loginData = {
    email: "juan@gmail.com",
    password: "1234",
  };

  before(async () => {
    const loginResponse = await requester.post("/auth/login").send(loginData);

    if (loginResponse.statusCode === 200) {
      const cookies = loginResponse.header["set-cookie"];
      authToken = cookies.find((cookie) => cookie.startsWith("coderToken"));
    }
  });

  it("Obtener usuarios", async () => {
    const response = await requester.get("/user").set("Cookie", authToken);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("users").that.is.an("array");
  });

  it("Obtener un usuario", async () => {
    const userId = "672b9021d676d3e0fc3f909d";

    const response = await requester
      .get(`/user/${userId}`)
      .set("Cookie", authToken);

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property("_id", userId);
  });

  it("Obtener usuario por Email", async () => {
    const userEmail = "brianaconroy@test.com";

    const response = await requester
      .get(`/user/email/${userEmail}`)
      .set("Cookie", authToken);

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property("email", userEmail);
  });

  it("Crear usuario", async () => {
    const response = await requester
      .post("/user/")
      .set("Cookie", authToken)
      .send({
        first_name: "TestUser",
        last_name: "TestLastName",
        email: "t3st2@gmail.com",
        password: "passwordTest",
        age: 18,
      });

    expect(response.statusCode).to.equal(201);
    expect(response.body).to.have.property("user");

    userId = response.body.user._id;
  });

  it("Editar Usuario", async () => {
    const userEditId = "672b942cf9269af1d79237fd";
    const response = await requester
      .put(`/user/${userEditId}`)
      .set("Cookie", authToken)
      .send({
        last_name: "TestNewLastName", 
      });

    expect(response.statusCode).to.equal(200);
    expect(response.body.last_name).to.equal("TestNewLastName");
  });

  it("Eliminar Usuario", async () => {
    expect(userId).to.not.be.undefined;

    const response = await requester
      .delete(`/user/${userId}`)
      .set("Cookie", authToken);

    expect(response.statusCode).to.equal(200);
  });
});
