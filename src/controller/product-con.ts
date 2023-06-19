import { Request, Response } from "express";
import productService from "../service/product-service";
import dbService from "../service/db-service";
import { Book } from "../service/types";

type ControllerType = (req: Request, res: Response) => Promise<void>;

export const getAllProducts: ControllerType = async (req, res) => {
  const books = await productService.getAllProducts();
  res.send({
    message: "All Product",
    books,
  });
};

export const createProduct: ControllerType = async (req, res) => {
  const { title, author, price } = req.body;

  if (!title || !author || !price) {
    res.status(400).send({
      message: "title, author, price is required",
    });
    return;
  }

  const newBook = await productService.createProduct(
    title,
    author,
    price
  );

  res.send({
    messaga: "Book Created",
    product: newBook,
  });
};


export const deleteProduct: ControllerType = async (req, res) => {
    const { id } = req.params
    const index = await dbService.getIndex('/books', +id)
    if( index < 0 ) {
        res.send({
            message: "Bu id bo`yicha malumot yoq",
        });
        return;
    }

    await dbService.delete(`/books[${index}]`);
    res.send({
    message: "Kitob o`chirildi",
    bookId: id,
  });
}


// Put request


export const updateProduct: ControllerType = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { author } = req.body;
  const { price } = req.body;

  const find = await dbService.find<Book>(
    "/books",
    (value, index) => value.id === +id
  );

  if (!find) {
    res.send({
      message: "Bunday malumot yoq",
    });
    return;
  }

  const allTodos = (await dbService.getData("/books")) as Book[];
  const books = allTodos.map((book) => {
    if (book.id === +id) {
      return {
        ...book,
        title,
        author,
        price
      };
    }
    return book;
  });

  await dbService.push("/todos", books);

  res.send({
    message: "Malumot yangilandi",
    task: {
      ...find,
      title,
      author,
      price
    },
  });
}