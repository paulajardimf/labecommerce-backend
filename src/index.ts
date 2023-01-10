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


// procura produtos por id
app.get('/products/:id', (req: Request, res: Response) => {
  const id = req.params.id;

  const result = products.find((product) => product.id === id);

  res.status(200).send(result);
})

// todas as compras
app.get('/purchases', (req: Request, res: Response) => {
  res.status(200).send(purchases)
})

// busca compras por id
app.get('/users/:id/purchases', (req: Request, res: Response) => {
  const id = req.params.id

  const result = purchases.find((user) => user.userId === id);

  res.status(200).send(result);
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

//excluir usuário por id
app.delete("/user/:id", (req: Request, res: Response) => {
  const id = req.params.id

  const indexToRemove = users.findIndex((user) => user.id === id)
  if (indexToRemove >= 0) {        
      users.splice(indexToRemove, 1)
  }

  res.status(200).send("Item deletado com sucesso")
})

//excluir produto por id
app.delete("/product/:id", (req: Request, res: Response) => {
  const id = req.params.id

  const indexToRemove = products.findIndex((product) => product.id === id)

  if (indexToRemove >= 0) {      
      products.splice(indexToRemove, 1)
  }

  res.status(200).send("Item deletado com sucesso")
})

//Editar usuário por id
app.put("/user/:id", (req: Request, resp: Response) => {
  const id = req.params.id

  const newId = req.body.id as string | undefined
  const newEmail = req.body.email as string | undefined
  const newPassword = req.body.password as string| undefined

  const user = users.find((user) => user.id === id)

  if (user){
      user.id = newId || user.id
      user.email = newEmail || user.email
      user.password = newPassword || user.password        
  }

  resp.status(200).send("Atualização realizada com sucesso")
})

//Editar produto por id
app.put("/product/:id", (req: Request, resp: Response) => {
  const id = req.params.id

  const newId = req.body.id as string | undefined
  const newName = req.body.name as string | undefined
  const newPrice = req.body.price as number | undefined
  const newCategory = req.body.category as Category | undefined

  const product = products.find((product) => product.id === id)

  if (product){
      product.id = newId || product.id
      product.name = newName || product.name
      product.price = newPrice || product.price
      product.category = newCategory || product.category        
  }

  resp.status(200).send("Atualização realizada com sucesso")
})