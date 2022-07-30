import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CvService } from 'src/app/services/cv.service';
import { Experiencia } from '../../datos/experiencia/experiencia';

@Component({
  selector: 'app-modificar-experiencia',
  templateUrl: './modificar-experiencia.component.html',
  styleUrls: ['./modificar-experiencia.component.css']
})
export class ModificarExperienciaComponent implements OnInit {

  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  disableSelect = new FormControl(this.data.actualmenteEnElCargo);
  form: FormGroup; 

  constructor(
    private fb:FormBuilder,
    private datas: CvService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public data: Experiencia
    ){  
      this.form = this.fb.group({
        id: [this.data.id, Validators.required],
        cargo: [this.data.cargo, [Validators.minLength(4), Validators.maxLength(50), Validators.required]],
        sector: [this.data.sector, [Validators.minLength(4), Validators.maxLength(50), Validators.required]],
        tipo: [this.data.tipo, Validators.required],
        nombreDeEmpresa: [this.data.nombreDeEmpresa, [Validators.minLength(4), Validators.maxLength(50), Validators.required]],
        ubicacion: [this.data.ubicacion, [Validators.minLength(4), Validators.maxLength(50), Validators.required]],
        mesDeInicio: [this.data.mesDeInicio, Validators.required],
        anioDeInicio: [this.data.anioDeInicio, Validators.required],
        mesDeFinalizacion: [this.data.mesDeFinalizacion, ],
        anioDeFinalizacion: [this.data.anioDeFinalizacion, ],  
        actualmenteEnElCargo: [this.data.actualmenteEnElCargo,]
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
    this.datas.postExperiencia(experiencia).subscribe(data => {
      if(data.status == 200){
        this._snackBar.open('🖊️  Experiencia actualizada correctamente!!!', '', {
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
}
 