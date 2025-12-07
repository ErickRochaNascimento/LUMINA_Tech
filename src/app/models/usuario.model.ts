export interface Usuario {
  id?: number | string; 
  nome: string;
  sobrenome: string;
  email: string;
  senha?: string;       
}