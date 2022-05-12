import Product from "../entity/product";
import IRepository from "../../@shared/repository/IRepository";


interface IProductRepository extends IRepository<Product> {}

export default IProductRepository;