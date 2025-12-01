export interface Usuario {
  id?: number | string; // O '?' torna o ID opcional na criação, pois geramos depois
  nome: string;
  email: string;
  senha?: string;       // A senha pode ser opcional ao recuperar a sessão (por segurança)
}