import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from "../../components/footer/footer.component";
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = inject(AuthService);
  router = inject(Router);
  email = ''; senha = '';

  entrar() {
    // Cria o objeto que o serviço espera
    const dadosLogin = {
      nome: this.email, // Ou this.usuario.nome, dependendo do seu form
      senha: this.senha
    };

    // Envia apenas 1 argumento (o objeto)
    this.auth.login(dadosLogin).subscribe({
      next: (user) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert('Email ou senha inválidos!');
      }
    });
  }
}