import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-crear-experiencia',
  templateUrl: './crear-experiencia.component.html',
  styleUrls: ['./crear-experiencia.component.css']
})
export class CrearExperienciaComponent implements OnInit {

  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  disableSelect = new FormControl(false);
  form: FormGroup;
  anios: number[] = [];

  constructor(
    private fb:FormBuilder,
    private service: CvService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar){ 

    this.form = this.fb.group({
      cargo: ["", [Validators.minLength(4), Validators.maxLength(50), Validators.required]],
      sector: ["", [Validators.minLength(4), Validators.maxLength(50), Validators.required]],
      tipo: ["", Validators.required],
      nombreDeEmpresa: ["", [Validators.minLength(4), Validators.maxLength(50), Validators.required]],
      ubicacion: ["", [Validators.minLength(4), Validators.maxLength(50), Validators.required]],
      mesDeInicio: ["", Validators.required],
      anioDeInicio: ["", Validators.required],
      mesDeFinalizacion: ["", ],
      anioDeFinalizacion: ["", ],
    },{validators: [this.validadorAnios]})
  }  

  guardarExperiencia(){
    if(this.currentUser != null){
      this.personaId = JSON.parse(this.currentUser).persona.id;
    }
    const persona = {
      id: this.personaId
    }
    const experiencia = {
      id: this.form.value.id,
      cargo: this.form.value.cargo,
      sector: this.form.value.sector,
      tipo: this.form.value.tipo,
      nombreDeEmpresa: this.form.value.nombreDeEmpresa,
      ubicacion: this.form.value.ubicacion,
      mesDeInicio: this.form.value.mesDeInicio,
      anioDeInicio: this.form.value.anioDeInicio,
      mesDeFinalizacion: this.form.value.mesDeFinalizacion,
      anioDeFinalizacion: this.form.value.anioDeFinalizacion,
      actualmenteEnElCargo: this.disableSelect.value,
      persona: persona
    }

    this.service.postExperiencia(experiencia).subscribe(data => {
      if(data.status == 201){
        this._snackBar.open('🖊️  Experiencia creada correctamente!!!', '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top'});
    }});
    this.dialog.closeAll();    
         
  }

  get Cargo(){
    return this.form.get("cargo");
  }

  get Sector(){
    return this.form.get("sector");
  }

  get Tipo(){
    return this.form.get("tipo");
  }

  get NombreDeEmpresa(){
    return this.form.get("nombreDeEmpresa")
  }

  get Ubicacion(){
    return this.form.get("ubicacion")
  }

  get MesDeInicio(){
    return this.form.get("mesDeInicio")
  }

  get AnioDeInicio(){
    return this.form.get("anioDeInicio")
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  ngOnInit(): void {
    for(let i = 1920; i < 2023; i++){
      this.anios.unshift(i);
    }
  }

  validadorAnios(control: AbstractControl) {
    const inicio: number = control.value.anioDeInicio;
    const finalizacion: number = control.value.anioDeFinalizacion;
    
    if (finalizacion && inicio > finalizacion) {
      const f = control.get('anioDeFinalizacion');
      if(f != null){
        f.setErrors({ error: true });
      }
    }
  }
}