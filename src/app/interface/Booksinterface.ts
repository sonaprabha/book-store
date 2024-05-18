export interface Booksinterface {
    _id: string,
    bookid:string,
  title: string,
  author: string,
  type?:string,
  publicationyear?:Number,
  price?:string,
  language?:string,
  condition?:string,
  available?: Boolean,
  quntity?:string
}