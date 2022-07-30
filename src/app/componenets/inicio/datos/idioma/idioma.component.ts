import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CvService } from 'src/app/services/cv.service';
import { CrearIdiomaComponent } from './crear-idioma/crear-idioma.component';

@Component({
  selector: 'app-idioma',
  templateUrl: './idioma.component.html',
  styleUrls: ['./idioma.component.css']
})
export class IdiomaComponent implements OnInit {

  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  idioma: any;

  constructor(private datos:CvService, public dialog: MatDialog) { }

  cargarIdioma(): void{
    if(this.currentUser != null){
      this.personaId = JSON.parse(this.currentUser).persona.id;
    }

    this.datos.getIdioma(this.personaId).subscribe(data => {
      this.idioma = data.body;

    });
  }

  ngOnInit(): void {  
    this.cargarIdioma();
  }

  openDialog(): void{
    const dialogRef = this.dialog.open(CrearIdiomaComponent, {data : this.idioma});
    dialogRef.afterClosed().subscribe(() =>
    this.cargarIdioma());
  };
}
