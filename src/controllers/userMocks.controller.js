import { faker } from "@faker-js/faker";
import { userModel } from "../models/user.model.js";

const createMock = async (req, res) => {
  const first_name = faker.person.firstName().toLowerCase();
  const last_name = faker.person.lastName().toLowerCase();
  const data = {
    first_name,
    last_name,
    email: first_name + last_name + "@test.com",
    password: "hola1234",
    age: 24,
  };
  const one = await userModel.create(data);
  return res.status(201).json({
    response: one,
    message: "User Created",
  });
};

const createMocks = async (req, res) => {
  const { quantity } = req.params;
  for (let i = 0; i < quantity; i++) {
    const first_name = faker.person.firstName().toLowerCase();
    const last_name = faker.person.lastName().toLowerCase();
    const data = {
      first_name,
      last_name,
      email: first_name + last_name + "@test.com",
      password: "hola1234",
      age: 24,
    };
    const one = await userModel.create(data);
  }
  return res.status(201).json({
    message: "Usuarios Creados: " + quantity,
  });
};

export { createMock, createMocks };
