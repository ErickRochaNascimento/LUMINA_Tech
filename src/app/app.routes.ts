import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/productdetail/productdetail.component';
import { SalesDashboardComponent } from './pages/salesdashboard/salesdashboard.component';
import { SearchComponent } from './pages/search/search.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ContatoComponent } from './pages/contatos/contatos.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { MeusPedidosComponent } from './pages/meus-pedidos/meus-pedidos.component';
// Importe o Guard novo
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'meus-pedidos', component: MeusPedidosComponent },
    
    // ROTA PROTEGIDA AQUI:
    { 
        path: 'dashboard', 
        component: SalesDashboardComponent,
        canActivate: [adminGuard] // Adicione esta linha
    },
    
    { path: 'product/:id', component: ProductDetailComponent },
    { path: 'search', component: SearchComponent },
    { path: 'sobre', component: SobreComponent },
    { path: 'contato', component: ContatoComponent },
    { path: '**', redirectTo: '' }
];