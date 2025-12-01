export interface Produto {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    rating: number;      
    stock: number;      
    brand: string;      
    category: string;
    thumbnail: string;
    images: string[];    
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
    'mobile-accessories'
];