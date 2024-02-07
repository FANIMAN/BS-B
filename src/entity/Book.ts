export default class Book {
    id?: number; // Make the id property optional

    title: string;
    writer: string;
    image: string;
    price: number;
    tags: string[];
  
    constructor(title: string, writer: string, image: string, price: number, tags: string[], id?: number) {
      this.id = id; // Assign the id parameter if provided
      this.title = title;
      this.writer = writer;
      this.image = image;
      this.price = price;
      this.tags = tags;
    }
}
