import { TUser, TProduct, TPurchase } from "./types";

export const users: TUser[] = [
  {
    id: "1",
    email: "labenu@labenu.com",
    password: "1234",
  },
  {
    id: "2",
    email: "labenu2@labenu.com",
    password: "1234",
  },
];

export const products: TProduct[] = [
  {
    id: "1",
    name: "Produto 1",
    price: 30,
    category: "camiseta"
  },
  {
    id: "2",
    name: "Produto 2",
    price: 15,
    category: "livro"
  },
]

export const purchases: TPurchase[] = [
  {
    userId: "1",
    productId: "1",
    quantity: 2,
    totalPrice: 60,
  },
  {
    userId: "2",
    productId: "2",
    quantity: 3,
    totalPrice: 45,
  },
]