import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Pipe Currency e Date
import { SalesService } from '../../services/sales.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meus-pedidos.component.html',
  styleUrl: './meus-pedidos.component.css'
})
export class MeusPedidosComponent implements OnInit {
  salesService = inject(SalesService);
  authService = inject(AuthService);
  router = inject(Router);
  pedidos: any[] = [];

  ngOnInit() {
    // Redireciona se não estiver logado
    if (!this.authService.currentUser()) {
      this.router.navigate(['/login']);
      return;
    }
    this.pedidos = this.salesService.getSalesByUser();
  }
}