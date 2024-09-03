interface Category {
  category: string;
}

export class Product {
  private _id: string;
  private _title: string;
  private _description: string;
  private _price: number;
  private _category: string;

  constructor(
    id: string,
    title: string,
    description: string,
    price: number,
    category: string
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._price = price;
    this._category = category;
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get price(): number {
    return this._price;
  }

  get category(): string {
    return this._category;
  }
}
