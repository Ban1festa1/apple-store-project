const API_URL = "http://localhost:1452/api/products/";

export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Ошибка при загрузке товаров");
  }

  return await response.json();
}
