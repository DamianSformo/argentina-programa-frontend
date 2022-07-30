import { Component, OnInit } from '@angular/core';
import { CvService } from 'src/app/services/cv.service';
import { MatDialog } from '@angular/material/dialog';
import { CrearConocimientoComponent } from './crear-conocimiento/crear-conocimiento.component';

@Component({
  selector: 'app-conocimiento',
  templateUrl: './conocimiento.component.html',
  styleUrls: ['./conocimiento.component.css']
})
export class ConocimientoComponent implements OnInit {

  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  conocimiento: any;
  personaConocimientoInicioDto: any;

  constructor(
    private service:CvService,
    public dialog: MatDialog,) { }


  cargarConocimiento(): void{
    if(this.currentUser != null){
      this.personaId = JSON.parse(this.currentUser).persona.id;
    }
    this.service.getConocimientoPresentacion(this.personaId).subscribe(data => {
      this.personaConocimientoInicioDto = data;
    });
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(CrearConocimientoComponent, {});
    dialogRef.afterClosed().subscribe(() => {
      this.cargarConocimiento();
    })
  }
    
  ngOnInit(): void {
    this.cargarConocimiento();
  }
}
