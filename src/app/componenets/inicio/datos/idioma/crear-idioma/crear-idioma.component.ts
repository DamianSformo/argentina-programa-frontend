import { Component, Inject, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { CvService } from 'src/app/services/cv.service';

import {FormControl} from '@angular/forms';
import {finalize, map, startWith} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-crear-idioma',
  templateUrl: './crear-idioma.component.html',
  styleUrls: ['./crear-idioma.component.css']
})
export class CrearIdiomaComponent implements OnInit {

  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  form: FormGroup;
  myControl = new FormControl('');
  filteredOptions: Observable<string[]> = new Observable;
  idiomas: string[] = [];
  idiomasPersona: string[] = [];

  constructor(private fb:FormBuilder, private datas: CvService, public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any

    ) {
    this.form = this.fb.group({
      idioma: ["", Validators.required],
      competencia: ["", Validators.required]
    })
  }

  guardarIdioma(){
    if(this.currentUser != null){
      this.personaId = JSON.parse(this.currentUser).persona.id;
    }
    if((this.idiomasPersona.includes(this.form.value.idioma)) || (this.idiomasPersona.includes(this.form.value.idioma.toLowerCase())) || (this.idiomasPersona.includes(this.form.value.idioma.charAt(0).toUpperCase() + this.form.value.idioma.slice(1)))){
      this._snackBar.open("Alguno de estos idiomas ya está en tu perfil", "x");
    } else {
      const idioma = {
      persona: {"id": this.personaId},
      idioma: {'nombre': this.form.value.idioma},
      competencia: this.form.value.competencia
    }
    this.datas.postIdioma(idioma).subscribe(data => {
      if(data.status == 201){
        this._snackBar.open('💬 Idioma creado correctamente!!!', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'});
    }
      })
    this.dialog.closeAll();    
  }}

  traerIdiomas(): void{
    for(let i = 0 ; i < this.data.length ; i++){
      this.idiomasPersona.push(this.data[i].nombreIdioma)
    }
      this.datas.getIdiomas()
      .pipe(finalize(() => {
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        )      
      }))
      .subscribe(data => {
        for(let i = 0 ; i < data.length ; i++){
          if(!this.idiomasPersona.includes(data[i].nombre)){
            this.idiomas.push(data[i].nombre)
          }
      }})
  }

  ngOnInit(): void {
    this.traerIdiomas();
    }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.idiomas.filter(option => option.toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  get Competencia(){
    return this.form.get("competencia");
  }
}
