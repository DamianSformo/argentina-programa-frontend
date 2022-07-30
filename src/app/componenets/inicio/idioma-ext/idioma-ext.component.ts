import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CvService } from 'src/app/services/cv.service';
import { CrearIdiomaComponent } from '../datos/idioma/crear-idioma/crear-idioma.component';
import { Idioma } from '../datos/idioma/idioma';
import { ModificarIdiomaComponent } from './modificar-idioma/modificar-idioma.component';

@Component({
  selector: 'app-idioma-ext',
  templateUrl: './idioma-ext.component.html',
  styleUrls: ['./idioma-ext.component.css']
})
export class IdiomaExtComponent implements OnInit {

  personaId: number = 1;
  currentUser = sessionStorage.getItem('currentUser');
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
  }

  eliminarIdioma(idioma:Idioma){ 
    if(confirm("Estás a punto de eliminar un idioma, ¿Estás seguro?")){
      this.datos.deleteIdioma(idioma.id).subscribe(() => {
        this.cargarIdioma(); 
      })
  } 
}
openDialogg(idioma:Idioma): void{
  const dialogRef = this.dialog.open(ModificarIdiomaComponent, {
      
    data: {
      id: idioma.id,
      nombreIdioma: idioma.nombreIdioma,
      competenciaIdioma: idioma.competenciaIdioma},
  });

  dialogRef.afterClosed().subscribe(() => {
    this.cargarIdioma()
  });  
  
};

}
