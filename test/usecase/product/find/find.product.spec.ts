import { Sequelize } from "sequelize-typescript";
import { ProductNotFoundError } from "../../../../src/domain/@shared/errors/errors";
import Product from "../../../../src/domain/product/entity/product";
import ProductModel from "../../../../src/infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../../src/infrastructure/product/repository/sequelize/productRepository";
import FindProductUseCase from "../../../../src/usecase/product/find/find.product.usecase";


describe("test find product usecase", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);
    const customer = new Product(
      "123",
      "test",
      1.99
    );

    await productRepository.create(customer);

    const findInput = {
      id: "123"
    };

    const response = await findProductUseCase.execute(findInput);
    expect(response).toStrictEqual({
      id: "123",
      name: "test",
      price: 1.99
    })
  })


  it("should not find a product", async () => {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUseCase(productRepository);
    const findInput = {
      id: "123"
    };

    await expect(
      findProductUseCase.execute(findInput)
    ).rejects.toThrow(ProductNotFoundError);
  })
})