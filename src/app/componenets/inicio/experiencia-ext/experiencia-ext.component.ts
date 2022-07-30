import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CvService } from 'src/app/services/cv.service';
import { CrearExperienciaComponent } from '../datos/experiencia/crear-experiencia/crear-experiencia.component';
import { Experiencia } from '../datos/experiencia/experiencia';
import { ModificarExperienciaComponent } from './modificar-experiencia/modificar-experiencia.component';

@Component({
  selector: 'app-experiencia-ext',
  templateUrl: './experiencia-ext.component.html',
  styleUrls: ['./experiencia-ext.component.css']
})
export class ExperienciaExtComponent implements OnInit {

  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  experienciaCompleto: any; 

  constructor(
    private service:CvService,
    public dialog: MatDialog) {}

  cargarExperiencia(): void{
    if(this.currentUser != null){
      this.personaId = JSON.parse(this.currentUser).persona.id;
    }
    this.service.getExperienciaCompleto(this.personaId).subscribe(data => {
      this.experienciaCompleto = data.body; 
    });
  }

  ngOnInit(): void {
    this.cargarExperiencia();
  }

  eliminarExperiencia(experiencia:Experiencia){
    
    if(confirm("Está a punto de eliminar una experiencia, ¿Está seguro?")){
    this.service.deleteExperiencia(experiencia.id).subscribe(() => {
      this.cargarExperiencia(); 
      })
    }
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(CrearExperienciaComponent, {});
    dialogRef.afterClosed().subscribe(() => {
      this.cargarExperiencia();
    })
  }

  openDialogg(experiencia: Experiencia): void{
    const dialogRef = this.dialog.open(ModificarExperienciaComponent, {
      data: { id: experiencia.id,
              cargo: experiencia.cargo,
              tipo: experiencia.tipo,
              sector: experiencia.sector,
              nombreDeEmpresa: experiencia.nombreDeEmpresa,
              ubicacion: experiencia.ubicacion,
              mesDeInicio: experiencia.mesDeInicio,
              anioDeInicio: experiencia.anioDeInicio,
              mesDeFinalizacion: experiencia.mesDeFinalizacion,
              anioDeFinalizacion: experiencia.anioDeFinalizacion,
              actualmenteEnElCargo: experiencia.actualmenteEnElCargo,
              descripcion: experiencia.descripcion,   
      } 
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cargarExperiencia()
    })
  }
}
 
