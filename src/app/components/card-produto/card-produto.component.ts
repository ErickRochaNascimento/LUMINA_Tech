import { Component, Input, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';  
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-card-produto',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './card-produto.component.html',
  styleUrl: './card-produto.component.css'
})
export class CardProdutoComponent {
  @Input() produto!: Produto;
  
  private router = inject(Router);

  // Função de navegação
  verDetalhes() {
    // Navega para /product/ID
    this.router.navigate(['/product', this.produto.id]);
  }
}