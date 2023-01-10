import { users, products, purchases, queryProductsByName, CreateUser, CreateProduct, createPurchase } from "./database"
import { TUser, TProduct, TPurchase, Category } from "./types";
import express, { Request, Response } from "express";
import cors from "cors";


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
app.get('/users', (req: Request, res: Response) => {
  res.status(200).send(users)
})


// todos os produtos
app.get('/products', (req: Request, res: Response) => {
  res.status(200).send(products)
})


// todas as compras
app.get('/purchases', (req: Request, res: Response) => {
  res.status(200).send(purchases)
})

// busca produtos por nome
app.get('/products/search', (req: Request, res: Response) => {
  const q = req.query.q as string
  const result : TProduct[] = queryProductsByName(q);

  res.status(200).send(result)
})

// cria usuário
app.post('/users', (req: Request, res: Response) => {
  const {id, email, password} = req.body as TUser

  CreateUser(id, email, password)

  res.status(201).send("Cadastro realizado com sucesso!")
})

// cria produto
app.post('/products', (req: Request, res: Response) => {
  const {id, name, price, category} = req.body as TProduct

  CreateProduct(id, name, price, category)

  res.status(201).send("Produto cadastrado com sucesso!")
})

// cria compra
app.post('/purchases', (req: Request, res: Response) => {
  const {userId, productId, quantity, totalPrice} = req.body as TPurchase

  createPurchase(userId, productId, quantity, totalPrice)

  res.status(201).send("Compra realizada com sucesso!")
})