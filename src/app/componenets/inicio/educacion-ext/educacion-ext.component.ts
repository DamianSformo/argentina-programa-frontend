import { Component, OnInit } from '@angular/core';
import { CvService } from 'src/app/services/cv.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearEducacionComponent } from '../datos/educacion/crear-educacion/crear-educacion.component';
import { Educacion } from '../datos/educacion/educacion';
import { ModificarEducacionComponent } from './modificar-educacion/modificar-educacion.component';

@Component({
  selector: 'app-educacion-ext',
  templateUrl: './educacion-ext.component.html',
  styleUrls: ['./educacion-ext.component.css']
})
export class EducacionExtComponent implements OnInit {

  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  educacionCompleto: any;
  
  constructor(
    private datos:CvService, 
    public dialog: MatDialog) {}

  openDialog(): void{
    const dialogRef = this.dialog.open(CrearEducacionComponent, {});
    dialogRef.afterClosed().subscribe(() => {
      this.cargarEducacion()
    });

  };

  cargarEducacion(): void{
    if(this.currentUser != null){
      this.personaId = JSON.parse(this.currentUser).persona.id;
    }
    this.datos.getEducacionCompleto(this.personaId).subscribe(data => {
      this.educacionCompleto = data.body;
    });
  }

  eliminarEducacion(educacion:Educacion){
    if(confirm("Esta a punto de eliminar una educación, ¿Está seguro?")){
      this.datos.deleteEducacion(educacion.id).subscribe(() => {
        this.cargarEducacion();
      });
       
    }
    
    
  }

  openDialogg(educacion: Educacion): void{
    const dialogRef = this.dialog.open(ModificarEducacionComponent, {
      
      data: {id: educacion.id,
             titulo: educacion.titulo,
             disciplina: educacion.disciplina,
             nota: educacion.nota,
             descripcion: educacion.descripcion,
             inicio: educacion.inicio,
             finalizacion: educacion.finalizacion,
             actualmenteCursando: educacion.actualmenteCursando,
             institucion: educacion.institucion},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarEducacion()  
    });
    
  };

  ngOnInit(): void {  
    this.cargarEducacion();
  }
}
