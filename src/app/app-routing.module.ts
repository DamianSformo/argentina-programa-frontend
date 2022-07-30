import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componenets/login/login.component';
import { RegistroComponent } from './componenets/registro/registro.component';


const routes: Routes = [
  {path: "", redirectTo: "inicio/datos", pathMatch: "full"},
  {path: "login", component: LoginComponent},
  {path: "login", loadChildren: () => import("./componenets/login/login.module").then(x => x.LoginModule)},
  {path: "inicio", redirectTo: "inicio/datos", pathMatch: "full"},
  {path: "inicio", loadChildren: () => import("./componenets/inicio/inicio.module").then(x => x.InicioModule)},
  {path: "registro", component: RegistroComponent},
  {path: "registro", loadChildren: () => import("./componenets/registro/registro.module").then(x => x.RegistroModule)},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
