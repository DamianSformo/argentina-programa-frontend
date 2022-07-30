import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CvService } from 'src/app/services/cv.service';
import { CrearConocimientoComponent } from '../datos/conocimiento/crear-conocimiento/crear-conocimiento.component';

@Component({
  selector: 'app-conocimiento-ext',
  templateUrl: './conocimiento-ext.component.html',
  styleUrls: ['./conocimiento-ext.component.css']
})
export class ConocimientoExtComponent implements OnInit {

  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  PersonaConocimientoInicioDto: any;

  constructor(private datos:CvService, public dialog: MatDialog) { }

  openDialog(): void{
    const dialogRef = this.dialog.open(CrearConocimientoComponent, {});
    dialogRef.afterClosed().subscribe(() => {
      this.cargarConocimiento();
    });

  };

  cargarConocimiento(): void{
    if(this.currentUser != null){
      this.personaId = JSON.parse(this.currentUser).persona.id;
    }
    this.datos.getConocimientoPresentacion(this.personaId).subscribe(data => {
      this.PersonaConocimientoInicioDto = data;   
      console.log(data);
      
    });
  }
    
  ngOnInit(): void { 
    this.cargarConocimiento();
  }

  eliminarConocimiento(conocimiento:any){
    if(confirm("Está a punto de eliminar un conocimiento, ¿Está seguro?")){
      this.datos.deleteConocimiento(conocimiento.id).subscribe(() => {
        this.cargarConocimiento();
      });
    }
  }
}

