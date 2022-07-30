import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit { 

  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  persona: any;

  constructor(private data:CvService, private ruta: Router) {}

  cargarPersona(): void{
    if(this.currentUser != null){
      this.personaId = JSON.parse(this.currentUser).persona.id;
    }
    this.data.getPersonaHeader(this.personaId).subscribe(data => {
      this.persona = data.body;   
    });
  }

  cerrarSesion(){
    sessionStorage.removeItem('currentUser');
    this.ruta.navigate(["/login"])
  }

  ngOnInit(): void {
    this.persona = {
      nombre: "",
      appelido: "",
      descripcion: ""
      }
    this.cargarPersona();
  }

}
