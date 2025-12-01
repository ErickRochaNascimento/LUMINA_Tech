// src/app/services/card-produto.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto, ProdutoResponse } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CardProdutoService {
  private apiUrl = 'https://dummyjson.com/products';
  private http = inject(HttpClient); 

  getProdutos(categoria: string): Observable<ProdutoResponse> {
    return this.http.get<ProdutoResponse>(`${this.apiUrl}/category/${categoria}`);
  }

  getProdutoById(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  // ADICIONE ESTE MÉTODO NOVO:
  searchProdutos(query: string): Observable<ProdutoResponse> {
    return this.http.get<ProdutoResponse>(`${this.apiUrl}/search?q=${query}`);
  }
}