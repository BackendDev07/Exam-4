"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.createProduct = exports.getAllProducts = void 0;
const product_service_1 = __importDefault(require("../service/product-service"));
const db_service_1 = __importDefault(require("../service/db-service"));
const getAllProducts = async (req, res) => {
    const books = await product_service_1.default.getAllProducts();
    res.send({
        message: "All Product",
        books,
    });
};
exports.getAllProducts = getAllProducts;
const createProduct = async (req, res) => {
    const { title, author, price } = req.body;
    if (!title || !author || !price) {
        res.status(400).send({
            message: "title, author, price is required",
        });
        return;
    }
    const newBook = await product_service_1.default.createProduct(title, author, price);
    res.send({
        messaga: "Book Created",
        product: newBook,
    });
};
exports.createProduct = createProduct;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const index = await db_service_1.default.getIndex('/books', +id);
    if (index < 0) {
        res.send({
            message: "Bu id bo`yicha malumot yoq",
        });
        return;
    }
    await db_service_1.default.delete(`/books[${index}]`);
    res.send({
        message: "Kitob o`chirildi",
        bookId: id,
    });
};
exports.deleteProduct = deleteProduct;
// Put request
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const { author } = req.body;
    const { price } = req.body;
    const find = await db_service_1.default.find("/books", (value, index) => value.id === +id);
    if (!find) {
        res.send({
            message: "Bunday malumot yoq",
        });
        return;
    }
    const allTodos = (await db_service_1.default.getData("/books"));
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
    await db_service_1.default.push("/todos", books);
    res.send({
        message: "Malumot yangilandi",
        task: {
            ...find,
            title,
            author,
            price
        },
    });
};
exports.updateProduct = updateProduct;
