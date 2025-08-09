type Product = {
  title: string;
  price: number;
  description?: string;
}

export const fruits: Product[] = [
  { title: 'Apple', price: 1 },
  { title: 'Melon', price: 1 },
  { title: 'Orange', price: 2 },
]

export const vegetables: Product[] = [
  { title: 'Onion', price: 4 },
  { title: 'Carrot', price: 3 },
  { title: 'Tomato', price: 2 },
]