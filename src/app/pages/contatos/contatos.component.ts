import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../../components/footer/footer.component"; 
import { HeaderComponent } from '../../components/header/header.component';


@Component({
  selector: 'app-contato',
  standalone: true,
  imports: [FormsModule, FooterComponent, HeaderComponent],
  templateUrl: './contatos.component.html',
  styleUrl: './contatos.component.css'
})
export class ContatoComponent {
  mensagem = {
    nome: '',
    email: '',
    texto: ''
  };

  enviarMensagem() {
    alert(`Obrigado, ${this.mensagem.nome}! Sua mensagem foi enviada com sucesso.`);
    this.mensagem = { nome: '', email: '', texto: '' }; 
  }
}