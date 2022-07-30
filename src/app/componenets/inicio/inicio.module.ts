import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio.component';
import { ExperienciaComponent } from './datos/experiencia/experiencia.component';
import { EducacionComponent } from './datos/educacion/educacion.component';
import { DatosComponent } from './datos/datos.component';
import { PresentacionComponent } from './presentacion/presentacion.component';
import { CrearEducacionComponent } from './datos/educacion/crear-educacion/crear-educacion.component';
import { EducacionExtComponent } from './educacion-ext/educacion-ext.component';
import { ConocimientoComponent } from './datos/conocimiento/conocimiento.component';
import { CrearConocimientoComponent } from './datos/conocimiento/crear-conocimiento/crear-conocimiento.component';
import { IdiomaComponent } from './datos/idioma/idioma.component';
import { CrearIdiomaComponent } from './datos/idioma/crear-idioma/crear-idioma.component';
import { ModificarEducacionComponent } from './educacion-ext/modificar-educacion/modificar-educacion.component';
import { CrearExperienciaComponent } from './datos/experiencia/crear-experiencia/crear-experiencia.component';
import { ExperienciaExtComponent } from './experiencia-ext/experiencia-ext.component';
import { ModificarExperienciaComponent } from './experiencia-ext/modificar-experiencia/modificar-experiencia.component';
import { IdiomaExtComponent } from './idioma-ext/idioma-ext.component';
import { ModificarIdiomaComponent } from './idioma-ext/modificar-idioma/modificar-idioma.component';
import { ModificarPerfilComponent } from './presentacion/modificar-perfil/modificar-perfil.component';
import { ConocimientoExtComponent } from './conocimiento-ext/conocimiento-ext.component';
import { HeaderComponent } from './header/header.component';
import { InformacionContactoComponent } from './presentacion/informacion-contacto/informacion-contacto.component';
import { FooterComponent } from './footer/footer.component';
import { ModificarInformacionContactoComponent } from './presentacion/modificar-informacion-contacto/modificar-informacion-contacto.component';
import { ModificarBannerComponent } from './presentacion/modificar-banner/modificar-banner.component';


@NgModule({
  declarations: [
    InicioComponent,
    ExperienciaComponent,
    EducacionComponent,
    DatosComponent,
    PresentacionComponent,
    CrearEducacionComponent,
    EducacionExtComponent,
    ConocimientoComponent,
    CrearConocimientoComponent,
    IdiomaComponent,
    CrearIdiomaComponent,
    ModificarEducacionComponent,
    CrearExperienciaComponent,
    ExperienciaExtComponent,
    ModificarExperienciaComponent,
    IdiomaExtComponent,
    ModificarIdiomaComponent,
    ModificarPerfilComponent,
    ConocimientoExtComponent,
    HeaderComponent,
    InformacionContactoComponent,
    FooterComponent,
    ModificarInformacionContactoComponent,
    ModificarBannerComponent,
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    SharedModule
  ]
})
export class InicioModule { }
