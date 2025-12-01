import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardProdutoService } from '../../services/card-produto.service';
import { SalesService } from '../../services/sales.service';
import { Produto } from '../../models/produto.model';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CardProdutoComponent } from '../../components/card-produto/card-produto.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, HeaderComponent, FooterComponent, CardProdutoComponent],
  templateUrl: './productdetail.component.html',
  styleUrl: './productdetail.component.css'
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private produtoService = inject(CardProdutoService);
  private salesService = inject(SalesService);

  produtosRelacionados: Produto[] = [];
  produto: Produto | null = null;
  loading = true;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loading = true;
        this.carregarProduto(id);
      }
    });
  }

  carregarProduto(id: string) {
    this.produtoService.getProdutoById(id).subscribe({
      next: (data) => {
        this.produto = data;
        this.loading = false;
        // 4. ASSIM QUE CARREGAR O PRODUTO, BUSCA OS RELACIONADOS PELA CATEGORIA
        this.carregarRelacionados(data.category);
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  carregarRelacionados(categoria: string) {
    this.produtoService.getProdutos(categoria).subscribe({
      next: (resp) => {
        // Filtra para remover o produto que já estamos vendo da lista
        this.produtosRelacionados = resp.products.filter(p => p.id !== this.produto?.id);
      }
    });
  }

  comprarProduto() {
    if (this.produto) {
      this.salesService.recordSale(this.produto);
    }
  }
}