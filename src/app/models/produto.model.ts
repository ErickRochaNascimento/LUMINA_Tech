export interface Produto {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    rating: number;      // Necessário para as estrelas
    stock: number;       // Necessário para o estoque
    brand: string;       // Necessário para a marca
    category: string;
    thumbnail: string;
    images: string[];    // Necessário para a galeria
}

// A resposta da API DummyJSON vem neste formato
export interface ProdutoResponse {
    products: Produto[];
    total: number;
    skip: number;
    limit: number;
}

export const CATEGORIAS_ELETRONICOS = [
    'smartphones', 
    'laptops', 
    'tablets',
    'mobile-accessories' // Adicione outras se a API suportar
];