import { expect } from "chai";
import supertest from "supertest";
import { config } from "../src/config/config.js";

const requester = supertest(`http://localhost:${config.PORT}/api`);

describe("Test Carrito", () => {
  let authToken;
  let cartId;

  const loginData = {
    email: "juan@gmail.com",
    password: "1234",
  };

  before(async () => {
    const loginResponse = await requester.post("/auth/login").send(loginData);
    if (loginResponse.statusCode === 200) {
      const cookies = loginResponse.headers["set-cookie"];
      const tokenCookie = cookies.find((cookie) => cookie.startsWith("coderToken"));
      authToken = tokenCookie.split(';')[0].split('=')[1];
    }
  });

  it("Crear Carrito", async () => {
    const response = await requester
      .post("/carts")
      .set("Cookie", `coderToken=${authToken}`)
      .send({
        products: [
          {
            product: "672b99b5c182abc9bf6636bc",
            quantity: 3,
          },
        ],
      });

    expect(response.statusCode).to.equal(201);
    expect(response.body).to.have.property("_id");
    cartId = response.body._id;
  });
  

  it("Agregar Producto al Carrito", async () => {
    const response = await requester
      .post(`/carts/${cartId}/products`)
      .set("Cookie", `coderToken=${authToken}`)
      .send({
        products: [
          {
            product: "672b99b5c182abc9bf6636be",
            quantity: 1,
          },
        ],
      });
  
    expect(response.statusCode).to.equal(200);
  });

  it("Obtener carrito", async () => {
    const response = await requester
      .get(`/carts/${cartId}`)
      .set("Cookie", `coderToken=${authToken}`);

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property("_id", cartId);
  });

  it("Actualizar Carrito", async () => {
    const response = await requester
      .post(`/carts/${cartId}/products`)
      .set("Cookie", `coderToken=${authToken}`)
      .send({
        products: [
          {
            product: "672b99b5c182abc9bf6636be",
            quantity: 1,
          },
        ],
      });
  
    expect(response.statusCode).to.equal(200);
    expect(response.body.products).to.have.lengthOf.above(0); 
  });

  it("Eliminar carrito", async () => {
  
    const response = await requester
      .delete(`/carts/${cartId}`)
      .set("Cookie", `coderToken=${authToken}`);
  
    expect(response.statusCode).to.equal(200); 
    expect(response.body.message).to.equal("Carrito eliminado"); 
  });
  
});
