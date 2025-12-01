import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  auth = inject(AuthService); 
  private router = inject(Router);
  termoBusca = '';

  pesquisar() {
    if (this.termoBusca.trim()) {
      this.router.navigate(['/search'], { queryParams: { q: this.termoBusca } });
      this.termoBusca = '';
    }
  }
}