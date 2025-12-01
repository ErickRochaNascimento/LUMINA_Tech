import { Component, Input, inject } from '@angular/core'; // 1. Adicione inject
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';   // 2. Importe Router
import { Produto } from '../../models/produto.model';

@Component({
  selector: 'app-card-produto',
  standalone: true,
  imports: [CommonModule], // Nota: RouterLink não é mais estritamente necessário aqui, mas pode manter
  templateUrl: './card-produto.component.html',
  styleUrl: './card-produto.component.css'
})
export class CardProdutoComponent {
  @Input() produto!: Produto;
  
  // 3. Injete o roteador
  private router = inject(Router);

  // 4. Crie a função de navegação
  verDetalhes() {
    // Navega para /product/ID
    this.router.navigate(['/product', this.produto.id]);
  }
}