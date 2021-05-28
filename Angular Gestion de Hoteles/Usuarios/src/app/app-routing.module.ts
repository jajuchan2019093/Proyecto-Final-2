import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import {HotelesComponent} from './componentes/hoteles/hoteles.component';
import {InicioComponent} from './componentes/inicio/inicio.component';
import {UsuariosComponent} from './componentes/usuarios/usuarios.component';
import {AgregarHotelComponent} from './componentes/agregar-hotel/agregar-hotel.component';


const routes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'registro',component: RegistroComponent},
{path: 'hoteles', component: HotelesComponent},
{path: 'inicio', component: InicioComponent},
{path: 'usuario', component: UsuariosComponent},
{path: 'agregarHotel', component: AgregarHotelComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
