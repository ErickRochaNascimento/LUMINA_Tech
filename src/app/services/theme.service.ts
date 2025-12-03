import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDarkTheme = signal<boolean>(false);

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme === 'dark') {
        this.setDarkTheme(true);
      }
    }
  }

  toggleTheme(): void {
    this.setDarkTheme(!this.isDarkTheme());
  }

  private setDarkTheme(isDark: boolean): void {
    this.isDarkTheme.set(isDark);
    
    if (isDark) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}