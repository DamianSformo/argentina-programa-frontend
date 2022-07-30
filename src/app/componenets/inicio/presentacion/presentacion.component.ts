import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { CvService } from 'src/app/services/cv.service';
import { InformacionContactoComponent } from './informacion-contacto/informacion-contacto.component';
import { ModificarBannerComponent } from './modificar-banner/modificar-banner.component';
import { ModificarInformacionContactoComponent } from './modificar-informacion-contacto/modificar-informacion-contacto.component';
import { ModificarPerfilComponent } from './modificar-perfil/modificar-perfil.component';
import { Persona } from './persona';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrls: ['./presentacion.component.css']
})
export class PresentacionComponent implements OnInit {

  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  personaEmail: string = "damiansformo@gmail.com";
  persona: any

  constructor(
    private service: CvService,
    public dialog: MatDialog, 
  ){}
   
  cargarPersona(): void{ 
    if(this.currentUser != null){
      this.personaId = JSON.parse(this.currentUser).persona.id;
      this.personaEmail = JSON.parse(this.currentUser).email;
    }
    this.service.getPersona(this.personaId).subscribe(data=> {
      this.persona = data.body;
    }); 
  }
  
  ngOnInit(): void {
    this.persona = {
      nombre: "",
      direccion: {
        pais: ""
      }
    }
    this.cargarPersona();
  }

  /*
  guardarPresentacion(){

    const direccion = {
      id: this.form.direccion.id,
      direccion: this.form.direccion.direccion,
      codigoPostal: this.form.direccion.codigoPostal,
      ciudad: this.form.value.ciudad,
      pais: this.form.value.pais,
    }
    const presentacion = {
      id: this.form.value.id,
      nombre: this.form.value.nombre ,
      apellido: this.form.value.apellido,
      tipoDocumento: this.form.value.tipoDocumento,
      numeroDocumento: this.form.value.numeroDocumento,
      descripcion: this.form.value.descripcion,
      buscandoTrabajo: this.form.value.buscandoTrabajo,
      verEmail: this.form.value.verEmail,
      numeroWhatsapp: this.form.value.numeroWhatsapp,
      verNumeroWhatsapp: this.form.value.verLinkedin,
      linkedin: this.form.value.linkedin ,
      verLinkedin: this.form.value.verLinkedin,
      verDireccion: this.form.value.verDireccion,
      direccion: direccion
    }

    this.service.postPersona(presentacion).subscribe(e => {});
    this.dialog.closeAll();
  }
  */

  informacionDeContacto(persona : Persona){
    const dialogRef = this.dialog.open(InformacionContactoComponent, {

      data: { nombreCompleto: persona.nombre + " " + persona.apellido,
              email: this.personaEmail,
              verEmail: persona.verEmail,
              numeroWhatsapp: persona.numeroWhatsapp,
              verNumeroWhatsapp: persona.verNumeroWhatsapp,
              linkedin: persona.linkedin ,
              verLinkedin: persona.verLinkedin,
              direccion: persona.direccion.direccion,
              verDireccion: persona.verDireccion,
              },
    });
    
    dialogRef.afterClosed().subscribe(() => {
      this.cargarPersona()
    }); 
  }

  editarInformacionContacto(persona : any): void{
    const dialogRef = this.dialog.open(ModificarInformacionContactoComponent, {
      data: { 
        id: persona.id,
        email: this.personaEmail,
        nombre: persona.nombre ,
        apellido: persona.apellido,
        tipoDocumento: persona.tipoDocumento,
        numeroDocumento: persona.numeroDocumento,
        descripcion: persona.descripcion,
        buscandoTrabajo: persona.buscandoTrabajo,
        verEmail: persona.verEmail,
        numeroWhatsapp: persona.numeroWhatsapp,
        verNumeroWhatsapp: persona.verNumeroWhatsapp,
        linkedin: persona.linkedin ,
        verLinkedin: persona.verLinkedin,
        verDireccion: persona.verDireccion,
        direccion: persona.direccion,
        banner: persona.banner
        },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cargarPersona()
    }); 
  }

  editarPresentacion(persona : Persona): void{
    const dialogRef = this.dialog.open(ModificarPerfilComponent, {

      data: { 
        id: persona.id,
        nombre: persona.nombre ,
        apellido: persona.apellido,
        tipoDocumento: persona.tipoDocumento,
        numeroDocumento: persona.numeroDocumento,
        descripcion: persona.descripcion,
        buscandoTrabajo: persona.buscandoTrabajo,
        verEmail: persona.verEmail,
        numeroWhatsapp: persona.numeroWhatsapp,
        verNumeroWhatsapp: persona.verLinkedin,
        linkedin: persona.linkedin ,
        verLinkedin: persona.verLinkedin,
        verDireccion: persona.verDireccion,
        direccion: persona.direccion,
        banner: persona.banner
        },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cargarPersona()
    }); 
  }

  editarBanner(persona : Persona): void{
    const dialogRef = this.dialog.open(ModificarBannerComponent, {

      data: { 
        id: persona.id,
        nombre: persona.nombre ,
        apellido: persona.apellido,
        tipoDocumento: persona.tipoDocumento,
        numeroDocumento: persona.numeroDocumento,
        descripcion: persona.descripcion,
        buscandoTrabajo: persona.buscandoTrabajo,
        verEmail: persona.verEmail,
        numeroWhatsapp: persona.numeroWhatsapp,
        verNumeroWhatsapp: persona.verLinkedin,
        linkedin: persona.linkedin ,
        verLinkedin: persona.verLinkedin,
        verDireccion: persona.verDireccion,
        direccion: persona.direccion,
        banner: persona.banner
        },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cargarPersona()
    }); 
  }
  
}
