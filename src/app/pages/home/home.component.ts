import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CardProdutoComponent } from "../../components/card-produto/card-produto.component";
import { CardProdutoService } from '../../services/card-produto.service';
import { Produto, CATEGORIAS_ELETRONICOS } from '../../models/produto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, CardProdutoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // Injeção do serviço
  private cardProdutoService = inject(CardProdutoService);

  // Listas para armazenar os produtos
  smartphones: Produto[] = [];
  laptops: Produto[] = [];
  tablets: Produto[] = [];
  produtosSamsung: Produto[] = [];
  produtosApple: Produto[] = [];
  

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    // Busca Smartphones
    this.cardProdutoService.getProdutos('smartphones').subscribe({
      next: (data) => {
        this.smartphones = data.products;
      },
      error: (err) => console.error('Erro ao buscar smartphones', err)
    });

    // Busca Laptops
    this.cardProdutoService.getProdutos('laptops').subscribe({
      next: (data) => {
        this.laptops = data.products;
      },
      error: (err) => console.error('Erro ao buscar laptops', err)
    });

    this.cardProdutoService.getProdutos('tablets').subscribe({
      next: (data) => {
        this.tablets = data.products;
      },
      error: (err) => console.error('Erro ao buscar tablets', err)
    });

    this.cardProdutoService.searchProdutos('Samsung').subscribe({
      next: (data) => {
        // Filtra client-side para garantir que é a marca mesmo, se desejar, 
        // mas o search da API geralmente retorna resultados relevantes.
        this.produtosSamsung = data.products.filter(p => 
            CATEGORIAS_ELETRONICOS.includes(p.category)
        );
      }
    });

    this.cardProdutoService.searchProdutos('Apple').subscribe({
      next: (data) => {
        this.produtosApple = data.products.filter(p => 
            CATEGORIAS_ELETRONICOS.includes(p.category)
        );
        // Filtra client-side para garantir que é a marca mesmo, se desejar, 
        // mas o search da API geralmente retorna resultados relevantes.
      }
    });
  }


}