import { Component, OnInit, inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importe FormsModule para o <select>
import { SalesService } from '../../services/sales.service';
import { HeaderComponent } from "../../components/header/header.component";
import { Chart, registerables } from 'chart.js/auto';

Chart.register(...registerables);

@Component({
  selector: 'app-sales-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule], // Adicione FormsModule
  templateUrl: './salesdashboard.component.html',
  styleUrl: './salesdashboard.component.css'
})
export class SalesDashboardComponent implements OnInit, AfterViewInit {
  private salesService = inject(SalesService);

  totalVendas: number = 0;
  receitaTotal: number = 0;
  itemMaisVendido: string = '-'; // Renomeado para ser genérico (pode ser marca ou produto)

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
    
    // Destrói gráfico anterior se existir para evitar sobreposição
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    // Agrupamento dinâmico baseado no filtro
    const dadosAgrupados: any = {};
    
    vendas.forEach((v: any) => {
      let chave = '';
      if (this.filtroAtual === 'produto') chave = v.productTitle;
      else if (this.filtroAtual === 'categoria') chave = v.category;
      else if (this.filtroAtual === 'marca') chave = v.brand;

      dadosAgrupados[chave] = (dadosAgrupados[chave] || 0) + v.price;
    });

    // Calcular o "Top Item" baseado no agrupamento atual
    if (Object.keys(dadosAgrupados).length > 0) {
      this.itemMaisVendido = Object.keys(dadosAgrupados).reduce((a, b) => 
        dadosAgrupados[a] > dadosAgrupados[b] ? a : b
      );
    } else {
      this.itemMaisVendido = '-';
    }

    const labels = Object.keys(dadosAgrupados);
    const data = Object.values(dadosAgrupados);

    this.chartInstance = new Chart(this.salesChart.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `Receita por ${this.filtroAtual.toUpperCase()} (R$)`,
          data: data as number[],
          backgroundColor: '#324e67',
          borderColor: '#2997FF',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: `Performance por ${this.filtroAtual}` }
        }
      }
    });
  }
}