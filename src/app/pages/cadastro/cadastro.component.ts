import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'

})
export class CadastroComponent {
  auth = inject(AuthService);
  router = inject(Router);
  dados = { nome: '', email: '', senha: '' };

  registrar() {
    if (this.auth.cadastrar(this.dados)) {
      alert('Cadastro realizado! Faça login.');
      this.router.navigate(['/login']);
    } else {
      alert('Este e-mail já está em uso.');
    }
  }
}