import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConocimientoExtComponent } from './conocimiento-ext/conocimiento-ext.component';
import { DatosComponent } from './datos/datos.component';
import { EducacionExtComponent } from './educacion-ext/educacion-ext.component';
import { ExperienciaExtComponent } from './experiencia-ext/experiencia-ext.component';
import { IdiomaExtComponent } from './idioma-ext/idioma-ext.component';
import { InicioComponent } from './inicio.component';


const routes: Routes = [
  {path: '', component: InicioComponent, children: [
    {path: 'datos', component: DatosComponent},
    {path: 'educacion', component: EducacionExtComponent},
    {path: 'experiencia', component: ExperienciaExtComponent},
    {path: 'idioma', component: IdiomaExtComponent},
    {path: 'conocimiento', component: ConocimientoExtComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
