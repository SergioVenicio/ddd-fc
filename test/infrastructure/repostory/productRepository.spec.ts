import { Sequelize } from "sequelize-typescript";

import ProductRepository from "../../../src/infrastructure/repository/productRepository";

import ProductModel from "../../../src/infrastructure/db/sequelize/model/product.model";
import Product from "../../../src/domain/entities/product";
import { ProductNotFoundError } from "../../../src/errors/errors";

describe("ProductRepository test cases", () => {
  let squeleze: Sequelize;

  beforeEach(async () => {
    squeleze =  new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true}
    });

    squeleze.addModels([ProductModel]);
    await squeleze.sync();
  });

  afterEach(async () => {
    await squeleze.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "test", 1.99);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: {id : "1"}});
    expect(productModel.toJSON()).toStrictEqual(({
      'id': '1',
      'name': 'test',
      'price': 1.99
    }));
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "test", 1.99);
    await productRepository.create(product);
    
    product.changePrice(4.19)

    await productRepository.update(product);
    const productModel = await ProductModel.findOne({ where: {id : "1"}});
    expect(productModel.toJSON()).toStrictEqual(({
      'id': '1',
      'name': 'test',
      'price': 4.19
    }));
  });

  it("should find product by id", async() => {
    const productRepository = new ProductRepository();
    await productRepository.create(new Product("1", "test", 1.99));
    const product = await productRepository.find("1");

    expect(product.id).toBe("1");
    expect(product.name).toBe("test");
    expect(product.price).toBe(1.99);
  });

  it("should throw ProductNotFound Error with a invalid id", async() => {
    const productRepository = new ProductRepository();
    await productRepository.create(new Product("1", "test", 1.99));
    await expect(productRepository.find("12")).rejects.toThrowError(ProductNotFoundError);
  });

  it("should find all products", async() => {
    const productRepository = new ProductRepository();
    await productRepository.create(new Product("1", "test", 1.99));
    await productRepository.create(new Product("2", "test 2", 2.99));
    const products = await productRepository.findAll();

    expect(products.length).toBe(2);
    expect(products[0].id).toBe("1");
    expect(products[1].id).toBe("2");
  });

});