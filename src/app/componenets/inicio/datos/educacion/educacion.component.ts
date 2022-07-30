import { Component, OnInit } from '@angular/core';
import { CvService } from 'src/app/services/cv.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearEducacionComponent } from './crear-educacion/crear-educacion.component';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  educacionInicioDto: any;
  
  constructor(
    private service:CvService,
    public dialog: MatDialog) {} 

  cargarEducacion(): void{
    if(this.currentUser != null){
      this.personaId = JSON.parse(this.currentUser).persona.id;
    }
    this.service.getEducacionInicio(this.personaId).subscribe(data => {
      this.educacionInicioDto = data.body;
    });
  }

  ngOnInit(): void {  
    this.cargarEducacion();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(CrearEducacionComponent, {});
    dialogRef.afterClosed().subscribe(() => {
      this.cargarEducacion()
    });
  }
}
