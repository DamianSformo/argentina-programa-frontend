import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CvService } from 'src/app/services/cv.service';
import { MatDialog } from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-conocimiento',
  templateUrl: './crear-conocimiento.component.html',
  styleUrls: ['./crear-conocimiento.component.css']
})
export class CrearConocimientoComponent implements OnInit {

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addOnBlur = true;

  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;

  form: FormGroup;
  conocimiento: any;
  conocimientoNuevo: string[] = [];
  persona: string[] = [];
  
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.conocimientoNuevo.push(value);
    }
    event.chipInput!.clear();
  }

  constructor(
    private fb:FormBuilder, 
    private service: CvService, 
    public dialog: MatDialog, 
    private _snackBar: MatSnackBar,
    private ruta: Router) { 

    this.form = this.fb.group({
      conocimiento: ["", Validators.required],
      tipo:["", Validators.required]
    })
  } 

  ngOnInit(): void {
    this.traerConocimientos();
  }

  guardarConocimiento(){
    if(this.currentUser != null){
      this.personaId = JSON.parse(this.currentUser).persona.id;
    }
    for(let i = 0 ; i < this.conocimientoNuevo.length ; i++){
      if((this.persona.includes(this.conocimientoNuevo[i])) || (this.persona.includes(this.conocimientoNuevo[i].toLowerCase())) || (this.persona.includes(this.conocimientoNuevo[i].charAt(0).toUpperCase() + this.conocimientoNuevo[i].slice(1)))){ 
        this._snackBar.open("Alguno de estos conocimientos ya está en tu perfil", "x");
        break;
      }else{
          const conocimiento = {
            conocimiento: {"nombre": this.conocimientoNuevo[i]},
            persona: {"id": this.personaId},
            tipo: this.form.value.tipo
          }

            this.service.postConocimiento(conocimiento).subscribe(data => {
              if(data.status == 201){
                this._snackBar.open('📖  Conocimiento/s creado/s correctamente!!!', '', {
                  duration: 3000,
                  horizontalPosition: 'right',
                  verticalPosition: 'top'});
            }
              //if(data.status == 403){
                //sessionStorage.removeItem('currentUser');
                //this.ruta.navigate(["/login"])
              })
            this.dialog.closeAll();    
          }}}

  onNoClick(): void {
    this.dialog.closeAll();
  }

  traerConocimientos(): void{
    this.service.getConocimientoPresentacion(this.personaId).subscribe(data => {
      for(let i = 0 ; i < data.length ; i++){
        this.persona.push(data[i].nombreConocimiento);
      }
    });  
  }

  remove(conocimiento: string): void {
    const index = this.conocimientoNuevo.indexOf(conocimiento);
    if (index >= 0) {
      this.conocimientoNuevo.splice(index, 1);
    }
  }

  get Tipo(){
    return this.form.get("tipo");
  }

} 