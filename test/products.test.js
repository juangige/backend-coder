import { expect } from "chai";
import supertest from "supertest";
import { config } from "../src/config/config.js";

const requester = supertest(`http://localhost:${config.PORT}/api`);

describe("Test de Productos", () => {
  let authToken;
  let pid;

  // body del login con Rol de Admin
  const loginData = {
    email: "juan@gmail.com",
    password: "1234",
  };

  const productData = {
    title: "Test Producto",
    stock: 10,
    price: 99,
    description: "Producto creado en test",
    thumbnail: "img.com/test.jpg",
    code: "TEST123",
  };

  before(async () => {
    // login para los test
    const loginResponse = await requester.post("/auth/login").send(loginData);

    if (loginResponse.statusCode === 200) {
      const cookies = loginResponse.headers["set-cookie"];
      authToken = cookies.find((cookie) => cookie.startsWith("coderToken"));
    } else {
      console.error("Error en login:", loginResponse.body);
      throw new Error("Autenticación fallida");
    }
  });

  it("Obteniendo Productos", async () => {
    const response = await requester.get("/products/").set("Cookie", authToken);

    expect(response.statusCode).to.equal(200);
  });

  it("Creando Producto", async () => {
    const response = await requester
      .post("/products")
      .set("Cookie", authToken) // envio el token como cookie
      .send(productData);

    expect(response.statusCode).to.be.equals(201);
    expect(response.body).to.have.property("product");

    pid = response.body.product?._id;
    expect(pid).to.not.be.undefined;
  });

  it("Obteniendo un Producto", async () => {
    const response = await requester
      .get(`/products/${pid}`)
      .set("Cookie", authToken);

    expect(response.statusCode).to.equal(200);
  });

  it("Editando Producto", async () => {
    const response = await requester
      .put(`/products/${pid}`)
      .set("Cookie", authToken)
      .send({
        stock: 100,
      });

    expect(response.statusCode).to.be.equals(200);
    expect(response.body).to.have.property("updateProduct");
    expect(response.body.updateProduct.stock).to.equal(100);
  });

  it("Eliminando Producto", async () => {
    if (!pid) {
      throw new Error("El producto no fue creado, no se puede eliminar");
    }

    const response = await requester
      .delete(`/products/${pid}`)
      .set("Cookie", authToken); // envio el token como cookie

    expect(response.statusCode).to.be.equals(200);
  });
});
