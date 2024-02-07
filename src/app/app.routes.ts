import { Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { MineroFormComponent } from './pages/minero-form/minero-form.component';
import { CompraFormComponent } from './pages/compra-form/compra-form.component';
import { BarraFormComponent } from './pages/barra-form/barra-form.component';
import { TrasladoFormComponent } from './pages/traslado-form/traslado-form.component';
import { InicioComponent } from './pages/inicio/inicio.component';

export const routes: Routes = [   
    { path: '', component: InicioComponent },
    { path: 'minero', component: MineroFormComponent },
    { path: 'compra', component: CompraFormComponent },
    { path: 'barra', component: BarraFormComponent },
    { path: 'traslado', component: TrasladoFormComponent },
];
