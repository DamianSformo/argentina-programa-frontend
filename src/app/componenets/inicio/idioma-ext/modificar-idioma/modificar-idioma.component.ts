import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CvService } from 'src/app/services/cv.service';

@Component({ 
  selector: 'app-modificar-idioma',
  templateUrl: './modificar-idioma.component.html',
  styleUrls: ['./modificar-idioma.component.css']
})
export class ModificarIdiomaComponent implements OnInit {

  form: FormGroup;
  personaId: number = 1;
  currentUser = sessionStorage.getItem('currentUser');

  constructor(
  private fb:FormBuilder, 
  private datas: CvService, 
  public dialog: MatDialog,
  private _snackBar: MatSnackBar,
  
  
  @Inject(MAT_DIALOG_DATA) public data: any 
   
  ) { 
  this.form = this.fb.group({
    id: [this.data.id, Validators.required],
    nombreIdioma: [this.data.nombreIdioma, Validators.required],
    competenciaIdioma: [this.data.competenciaIdioma, Validators.required]
  })
  this.form.controls['nombreIdioma'].disable()
} 

agregarIdioma(){ 
  if(this.currentUser != null){
  this.personaId = JSON.parse(this.currentUser).persona.id;
}

  const idioma = {
    id: this.data.id,
    persona: {'id': this.personaId},
    idioma: {'nombre': this.data.nombreIdioma},
    competencia: this.form.value.competenciaIdioma
  }

  this.datas.postIdioma(idioma).subscribe(data => {
    if(data.status == 200){
      this._snackBar.open('🖊️  Idioma actualizado correctamente!!!', '', {
        duration: 3000,
        horizontalPosition: 'right',
      verticalPosition: 'top'});
  }});
  this.dialog.closeAll();   
}

onNoClick(): void {
  this.dialog.closeAll();
}

ngOnInit(): void {
}

get Competencia(){
  return this.form.get("competenciaIdioma");
}
}

