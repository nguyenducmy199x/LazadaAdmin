export class Product {
  category: string | undefined;
  title: string | undefined;
  price: string | undefined;
  describe: string | undefined;

  constructor(category: string, title: string, price: string, describe: string) {
    this.category = category;
    this.title = title;
    this.price = price;
    this.describe = describe;
  }
}
