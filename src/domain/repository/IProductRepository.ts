import Product from "../entities/product";
import IRepository from "./IRepository";


interface IProductRepository extends IRepository<Product> {}

export default IProductRepository;