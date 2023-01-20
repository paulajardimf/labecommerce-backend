import {
  users,
  products,
  purchases,
  queryProductsByName,
  CreateUser,
  CreateProduct,
  createPurchase,
} from "./database";
import { TUser, TProduct, TPurchase, Category } from "./types";
import express, { Request, Response } from "express";
import cors from "cors";
import { isErrored } from "stream";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

// teste
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

// todos os usuários
app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

// todos os produtos
app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

// procura produtos por id
app.get("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = products.find((product) => product.id === id);

    if (!result) {
      res.status(400);
      throw new Error("O produto não existe!");
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

// todas as compras
app.get("/purchases", (req: Request, res: Response) => {
  res.status(200).send(purchases);
});

// busca compras por id
app.get("/users/:id/purchases", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = purchases.find((user) => user.userId === id);

    if (!result) {
      res.status(400);
      throw new Error("Usuário não encontrado");
    }

    res.status(200).send(result);
    console.log("Array de compras do usuário");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

// busca produtos por nome
app.get("/products/search", (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    const result = queryProductsByName(q);

    if (q.length <= 1) {
      res.status(400); // definimos um status code apropriado antes do disparo
      throw new Error("query params deve possuir pelo menos um caractere");
    }

    res.status(200).send(result);
  } catch (error: any) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

// cria usuário
app.post("/users", (req: Request, res: Response) => {
  try {
    const { id, email, password } = req.body as TUser;

    const findId = users.find((user) => user.id === id);

    if (findId) {
      res.status(400);
      throw new Error("ID não disponível para cadastro.");
    }

    const findEmail = users.find((user) => user.email === email);

    if (findEmail) {
      res.status(400);
      throw new Error("Email não disponível para cadastro.");
    }

    CreateUser(id, email, password);
    res.status(201).send("Cadastro realizado com sucesso!");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

// cria produto
app.post("/products", (req: Request, res: Response) => {
  try {
    const { id, name, price, category } = req.body as TProduct;

    const findId = products.find((product) => product.id === id);

    if (findId) {
      res.status(400);
      throw new Error(
        "Não é possível cadastrar mais de um produto com a mesma id."
      );
    }

    CreateProduct(id, name, price, category);

    res.status(201).send("Produto cadastrado com sucesso!");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

// cria compra
app.post("/purchases", (req: Request, res: Response) => {
  try {
    const { userId, productId, quantity, totalPrice } = req.body as TPurchase;

    const findIdUser = users.find((user) => user.id === userId);

    if (!findIdUser) {
      res.status(400);
      throw new Error("ID do usuário não existe!");
    }

    const findIdProduct = products.find((product) => product.id === productId);

    if (!findIdProduct) {
      res.status(400);
      throw new Error("ID do produto não existe!");
    }

    createPurchase(userId, productId, quantity, totalPrice);

    res.status(201).send("Compra realizada com sucesso!");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//excluir usuário por id
app.delete("/user/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findUser = users.find((user) => user.id === id);
    if (!findUser) {
      res.status(400);
      throw new Error("Usuário não encontrado");
    }

    const indexToRemove = users.findIndex((user) => user.id === id);
    if (indexToRemove >= 0) {
      users.splice(indexToRemove, 1);
    }

    res.status(200).send("Item deletado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//excluir produto por id
app.delete("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findProduct = products.find((product) => product.id === id);
    if (!findProduct) {
      res.status(400);
      throw new Error("Produto não encontrado!");
    }

    const indexToRemove = products.findIndex((product) => product.id === id);

    if (indexToRemove >= 0) {
      products.splice(indexToRemove, 1);
    }

    res.status(200).send("Item deletado com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//Editar usuário por id
app.put("/user/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const findUser = users.find((user) => user.id === id);

    if (!findUser) {
      res.status(400);
      throw new Error("Usuário não encontrado!");
    }

    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

    const findEmail = users.find((user) => user.email === newEmail);
    if (newEmail && findEmail) {
      res.status(400);
      throw new Error("Este email já existe. Tente novamente.");
    }

    if (newPassword && newPassword.length < 6) {
      res.status(400);
      throw new Error(
        "A senha deve possuir no mínimo 6 caracteres. Tente novamente."
      );
    }

    findUser.email = newEmail || findUser.email;
    findUser.password = newPassword || findUser.password;

    res.status(200).send("Atualização realizada com sucesso");
  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});

//Editar produto por id
app.put("/product/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const findProduct = products.find((product) => product.id === id);

    if (!findProduct) {
      res.status(400);
      throw new Error("Produto não encontrado!");
    }

    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newCategory = req.body.category as Category | undefined;

    if (newName && newName.length < 2) {
      res.status(400);
      throw new Error("O nome deve possuir pelo menos 2 caracteres.");
    }

    if (typeof newPrice !== "number") {
      res.status(400);
      throw new Error("O preço deve ser um número. Tente novamente!");
    }

    findProduct.name = newName || findProduct.name;
    findProduct.price = newPrice || findProduct.price;
    findProduct.category = newCategory || findProduct.category;

    res.status(200).send("Atualização realizada com sucesso");

  } catch (error: any) {
    console.log(error);
    if (res.statusCode === 200) {
      res.status(500);
    }
    res.send(error.message);
  }
});
