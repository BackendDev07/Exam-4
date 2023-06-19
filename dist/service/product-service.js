"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_service_1 = __importDefault(require("../service/db-service"));
const getAllProducts = async () => {
    const books = await db_service_1.default.getData("/books");
    return books;
};
const createProduct = async (title, author, price) => {
    const id = (await db_service_1.default.getData("/id"));
    const newId = id + 1;
    await db_service_1.default.push("/id", newId);
    const newProduct = {
        id: newId,
        title,
        author,
        price,
    };
    await db_service_1.default.push("/books[]", newProduct);
    return newProduct;
};
// const deleteProduct: 
exports.default = {
    getAllProducts,
    createProduct,
};
