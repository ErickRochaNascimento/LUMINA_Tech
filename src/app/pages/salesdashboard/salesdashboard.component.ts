import { Component, OnInit, inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalesService } from '../../services/sales.service';
import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);

@Component({
  selector: 'app-sales-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './salesdashboard.component.html',
  styleUrl: './salesdashboard.component.css'
})
export class SalesDashboardComponent implements OnInit, AfterViewInit {
  private salesService = inject(SalesService);

  totalVendas: number = 0;
  receitaTotal: number = 0;
  itemMaisVendido: string = '-';

  // Tipo de filtro atual
  filtroAtual: 'produto' | 'categoria' | 'marca' = 'produto';
  chartInstance: Chart | null = null; // Para poder destruir e recriar o gráfico

  @ViewChild('salesChart') salesChart!: ElementRef;

  ngOnInit(): void {
    this.calcularMetricas();
  }

  ngAfterViewInit(): void {
    this.atualizarDashboard();
  }

  // Chamado quando o usuário muda o select
  onFilterChange() {
    this.atualizarDashboard();
  }

  atualizarDashboard() {
    this.calcularMetricas();
    this.gerarGrafico();
  }

  calcularMetricas() {
    const vendas = this.salesService.getSales();
    this.totalVendas = vendas.length;
    this.receitaTotal = vendas.reduce((acc: number, venda: any) => acc + venda.price, 0);
  }

 gerarGrafico() {
    const vendas = this.salesService.getSales();

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const dadosReceita: any = {};
    const dadosQuantidade: any = {};

    vendas.forEach((v: any) => {
      let chave = '';
      if (this.filtroAtual === 'produto') chave = v.productTitle;
      else if (this.filtroAtual === 'categoria') chave = v.category;
      else if (this.filtroAtual === 'marca') chave = v.brand;

      dadosReceita[chave] = (dadosReceita[chave] || 0) + v.price;
      dadosQuantidade[chave] = (dadosQuantidade[chave] || 0) + 1;
    });

    // Lógica do Item Mais Vendido (Baseado em Receita)
    if (Object.keys(dadosReceita).length > 0) {
      this.itemMaisVendido = Object.keys(dadosReceita).reduce((a, b) =>
        dadosReceita[a] > dadosReceita[b] ? a : b
      );
    } else {
      this.itemMaisVendido = '-';
    }

    const labels = Object.keys(dadosReceita);
    const dataReceita = labels.map(label => dadosReceita[label]);
    const dataQtd = labels.map(label => dadosQuantidade[label]);

    this.chartInstance = new Chart(this.salesChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `Receita (R$)`,
          data: dataReceita as number[], // A altura da barra continua sendo a Receita
          backgroundColor: '#324e67',
          borderColor: '#2997FF',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: `Performance por ${this.filtroAtual}` },
          // Legenda flutuante
          tooltip: {
            callbacks: {
              label: (context) => {
                // Pega o índice da barra onde o mouse está
                const index = context.dataIndex;
                
                // Busca a quantidade correspondente naquele índice
                const quantidade = dataQtd[index];
                
                // Pega o valor monetário da barra
                const valor = context.raw; 
                const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor as number);

                // Retorna a frase personalizada
                return `Vendas: ${quantidade} un. | Total: ${valorFormatado}`;
              }
            }
          }
        }
      }
    });
  }
}