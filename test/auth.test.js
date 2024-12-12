import { expect } from "chai";
import supertest from "supertest";
import { config } from "../src/config/config.js";

const requester = supertest(`http:localhost:${config.PORT}/api`);

describe("Testeo Auth", async () => {
  let authToken;

  const registerData = {
    first_name: "Juan",
    last_name: "Gigena",
    email: "TesteoAuth03@t3st.com",
    password: "12345",
    age: 27,
    role: "admin",
  };

  let loginData = {
    email: registerData.email,
    password: registerData.password,
  };

  it("Registro", async () => {
    const response = await requester.post("/auth/register").send(registerData);

    expect(response.statusCode).to.equal(201);
    expect(response.body)
      .to.have.property("message")
      .that.includes("Registro Correcto");
  });

  it("Login", async () => {
    const response = await requester.post("/auth/login").send(loginData);

    if (response.statusCode === 200) {
      const cookies = response.header["set-cookie"];
      authToken = cookies.find((cookie) => cookie.startsWith("coderToken"));
    }

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property("token");
  });

  it("Current", async () => {
    const response = await requester
      .get("/auth/current")
      .set("Cookie", authToken);

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property("email");
  });

  it("Logout", async () => {
    const response = await requester
      .get("/auth/logout")
      .set("Cookie", `coderToken=${authToken}`);

    expect(response.statusCode).to.equal(200);
    expect(response.body)
      .to.have.property("message")
      .that.includes("Logout exitoso");
  });
});
