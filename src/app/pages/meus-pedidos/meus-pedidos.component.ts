import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SalesService } from '../../services/sales.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-meus-pedidos',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
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