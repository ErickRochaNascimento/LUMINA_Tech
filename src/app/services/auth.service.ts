import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersKey = 'lumina_users';
  private sessionKey = 'usuario_logado'; // Mesma chave usada no login.component

  // Signal para atualizar o Header automaticamente
  currentUser = signal<any>(this.getSession());

  constructor(private router: Router) {}

  // --- VERIFICAÇÃO DE ADMIN ---
  isAdmin(): boolean {
    const user = this.currentUser();
    // AQUI DEFINIMOS QUEM É O ADMIN
    return user && user.email === 'admin@email.com'; 
  }

  // --- LOGIN (Com LocalStorage) ---
  login(usuario: Pick<Usuario, 'nome' | 'senha'>): Observable<Usuario> {
    const usuarios = this.getStoredUsers();
    
    // Procura usuário que tenha o mesmo nome E senha (ou email, dependendo do seu form)
    // Nota: Seu login.component usa 'nome', mas para ser admin geralmente usamos 'email'.
    // Vou verificar ambos para garantir.
    const userEncontrado = usuarios.find((u: any) => 
      (u.nome === usuario.nome || u.email === usuario.nome) && u.senha === usuario.senha
    );

    if (userEncontrado) {
      this.salvarSessao(userEncontrado);
      return of(userEncontrado); // Retorna sucesso
    } else {
      // Se for o login fixo de admin para teste (caso não tenha cadastrado)
      if (usuario.nome === 'admin@email.com' && usuario.senha === 'admin123') {
        const adminUser = { id: 1, nome: 'Administrador', email: 'admin@email.com', senha: '' };
        this.salvarSessao(adminUser);
        return of(adminUser as Usuario);
      }
      return throwError(() => new Error('Usuário ou senha incorretos'));
    }
  }

  // --- CADASTRO ---
  cadastrar(usuario: Usuario): Observable<boolean> {
    const usuarios = this.getStoredUsers();
    
    if (usuarios.find(u => u.email === usuario.email)) {
      return throwError(() => new Error('Email já existe'));
    }

    const novoUsuario = { ...usuario, id: new Date().getTime() };
    usuarios.push(novoUsuario);
    localStorage.setItem(this.usersKey, JSON.stringify(usuarios));
    
    return of(true);
  }

  // --- LOGOUT ---
  logout(): void {
    localStorage.removeItem(this.sessionKey);
    sessionStorage.removeItem(this.sessionKey);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  // --- MÉTODOS AUXILIARES ---
  private getStoredUsers(): any[] {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
    }
    return [];
  }

  private getSession() {
    if (typeof localStorage !== 'undefined') {
      return JSON.parse(localStorage.getItem(this.sessionKey) || sessionStorage.getItem(this.sessionKey) || 'null');
    }
    return null;
  }

  private salvarSessao(user: any) {
    // Remove a senha antes de salvar na sessão por segurança
    const { senha, ...sessao } = user;
    localStorage.setItem(this.sessionKey, JSON.stringify(sessao));
    this.currentUser.set(sessao);
  }

  // Mantido para compatibilidade com seu código antigo
  isAuthenticated(): boolean {
    return !!this.currentUser();
  }
}