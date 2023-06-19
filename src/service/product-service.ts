import dbService from "../service/db-service";
import { Book } from "./types";

type GetAllProduct = () => Promise<Book[]>;
type CreateProduct = (
  title: string,
  author: string,
  price: number
) => Promise<Book>;



const getAllProducts: GetAllProduct = async () => {
  const books = await dbService.getData("/books");
  return books;
};

const createProduct: CreateProduct = async (title, author, price) => {
  const id = (await dbService.getData("/id")) as number;
  const newId = id + 1;
  await dbService.push("/id", newId);
  const newProduct: Book = {
    id: newId,
    title,
    author,
    price,
  };
  await dbService.push("/books[]", newProduct);
  return newProduct;
};

// const deleteProduct: 

export default {
  getAllProducts,
  createProduct,
};
