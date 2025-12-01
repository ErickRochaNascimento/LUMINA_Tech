import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CardProdutoService } from '../../services/card-produto.service';
import { Produto,CATEGORIAS_ELETRONICOS } from '../../models/produto.model';
import { CardProdutoComponent } from '../../components/card-produto/card-produto.component';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, CardProdutoComponent, HeaderComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css' // Opcional se tiver CSS
})
export class SearchComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private produtoService = inject(CardProdutoService);
  
  produtos: Produto[] = [];
  termo: string = '';

  ngOnInit() {
    // Ouve mudanças na URL (ex: de ?q=iphone para ?q=samsung)
    this.route.queryParams.subscribe(params => {
      this.termo = params['q'];
      if (this.termo) {
        this.buscarProdutos(this.termo);
      }
    });
  }

  buscarProdutos(query: string) {
    this.produtoService.searchProdutos(query).subscribe({
     next: (data) => {
        // FILTRO APLICADO AQUI:
        this.produtos = data.products.filter(produto => 
          CATEGORIAS_ELETRONICOS.includes(produto.category)
        );
      },
      error: (err) => console.error(err)
    });
  }
}