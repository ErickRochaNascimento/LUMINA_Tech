import { Injectable, inject } from '@angular/core';
import { Produto } from '../models/produto.model';
import { AuthService } from './auth.service'; // Importe o AuthService

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private storageKey = 'lumina_sales';
  private authService = inject(AuthService); // Injete o Auth

  recordSale(produto: Produto): void {
    const user = this.authService.currentUser();
    
    if (!user) {
      alert('Por favor, faça login para comprar!');
      return;
    }
    
    const currentSales = this.getSales();
    
    const newSale = {
      productId: produto.id,
      productTitle: produto.title,
      price: produto.price,
      img: produto.thumbnail, // Útil para mostrar na lista
      date: new Date().toISOString(),
      userId: user.id // <--- VINCULA AO USUÁRIO
    };
    
    currentSales.push(newSale);
    localStorage.setItem(this.storageKey, JSON.stringify(currentSales));
    
    alert(`Compra realizada com sucesso!`);
  }

  getSales(): any[] {
    const sales = localStorage.getItem(this.storageKey);
    return sales ? JSON.parse(sales) : [];
  }

  // Novo método para filtrar por usuário
  getSalesByUser(): any[] {
    const user = this.authService.currentUser();
    if (!user) return [];
    
    const allSales = this.getSales();
    return allSales.filter((sale: any) => sale.userId === user.id);
  }
}