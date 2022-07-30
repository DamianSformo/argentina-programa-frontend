import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CvService } from 'src/app/services/cv.service';
import { CrearExperienciaComponent } from './crear-experiencia/crear-experiencia.component';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  experiencia: any;
  experienciaInicioDto: any;

  constructor(
    private service: CvService, 
    public dialog: MatDialog) { }

  cargarExperiencia(): void{
    if(this.currentUser != null){
      this.personaId = JSON.parse(this.currentUser).persona.id;
    }
    this.service.getExperienciaCompleto(this.personaId).subscribe(data => {
      this.experienciaInicioDto = data.body;
    });
  }

  ngOnInit(): void {
    this.cargarExperiencia();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(CrearExperienciaComponent, {});
    dialogRef.afterClosed().subscribe(() => {
      this.cargarExperiencia()
    });
  }
} 
