import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, map, Observable, startWith } from 'rxjs';
import { CvService } from 'src/app/services/cv.service';
import { Educacion } from '../../datos/educacion/educacion';
 
@Component({
  selector: 'app-modificar-educacion',
  templateUrl: './modificar-educacion.component.html',
  styleUrls: ['./modificar-educacion.component.css']
})
export class ModificarEducacionComponent implements OnInit {
  
  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  disableSelect = new FormControl(this.data.actualmenteCursando);
  form: FormGroup;
  apiPaises: any;
  paises: string[] = [];

  nombreInstituciones: any[] = [];
  institucionCtrl = new FormControl('');
  filteredInstituciones: Observable<any[]> = new Observable;
  instituciones: any[] = []

  constructor(
    private fb:FormBuilder, 
    private service: CvService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    
    @Inject(MAT_DIALOG_DATA) public data: Educacion 
    ){ 
    this.form = this.fb.group({
      id: [this.data.id, Validators.required],
      titulo: [this.data.titulo, [Validators.required, Validators.minLength(6), Validators.maxLength(150)]],
      disciplina: [this.data.disciplina, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      nota: [this.data.nota, Validators.min(1)],
      descripcion: [this.data.descripcion, ],
      inicio: [this.data.inicio, Validators.required],
      finalizacion: [this.data.finalizacion,],
      actualmenteCursando: [this.data.actualmenteCursando],
      institucion: [this.data.institucion.nombre, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
      pais: [this.data.institucion.pais, Validators.required],
      ciudad: [this.data.institucion.ciudad, ]
    },{validators: [this.validadorAnios]});
  } 

  private _filterStates(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.instituciones.filter(institucion => institucion.name.toLowerCase().includes(filterValue));
  }

  traerInstituciones(): void{
    this.service.getInstituciones()
    .pipe(finalize(() => {
      this.filteredInstituciones = this.institucionCtrl.valueChanges.pipe(
        startWith(''),
        map(institucion => (institucion ? this._filterStates(institucion) : this.instituciones.slice())),
      )
         
    }))
    .subscribe(data => {
      for(let i = 0 ; i < data.length ; i++){
        
          this.instituciones.push(data[i]);
          this.nombreInstituciones.push(data[i].nombre);
        
    }})
}

  guardarEducacion(){
    if(this.currentUser != null){
      this.personaId = JSON.parse(this.currentUser).persona.id;
    }
    const persona = {
      id: this.personaId
    }
    const institucion = {
      nombre: this.form.value.institucion,
      pais: this.form.value.pais,
      ciudad: this.form.value.ciudad
    }
    const educacion = { 
      id: this.form.value.id,
      titulo: this.form.value.titulo,
      disciplina: this.form.value.disciplina,
      nota: this.form.value.nota,
      descripcion: this.form.value.descripcion,
      inicio: this.form.value.inicio,
      finalizacion: this.form.value.finalizacion,
      actualmenteCursando: this.disableSelect.value,
      institucion: institucion,
      persona: persona
    }

    this.service.postEducacion(educacion).subscribe(data => {
      if(data.status == 200){
        this._snackBar.open('📖  Educación actualizada correctamente!!!', '', {
          duration: 3000,
          horizontalPosition: 'right',
        verticalPosition: 'top'});
    }});
    this.dialog.closeAll();   
  }

  traerPaises(){
    this.service.getPais()
    .pipe(finalize(() => {
      this.paises = this.paises.sort();
    }))
    
    .subscribe(data => {
      for(let i = 0 ; i < 250 ; i++){
        this.paises.push(data.body[i].translations.spa.common)
    }})

  }

  ngOnInit(): void {
    this.traerPaises();
    this.traerInstituciones();
  }

  validadorAnios(control: AbstractControl) {
    const inicio: number = control.value.inicio;
    const finalizacion: number = control.value.finalizacion;
    
    if (finalizacion && inicio > finalizacion) {
      const f = control.get('finalizacion');
      if(f != null){
        f.setErrors({ error: true });
      }
    }
  }

  onNoClick(): void {
    this.dialog.closeAll();
  }

  get Titulo(){
    return this.form.get("titulo");
  }

  get Disciplina(){
    return this.form.get("disciplina");
  }

  get Finalizacion(){
    return this.form.get("finalizacion");
  }

  get Institucion(){
    return this.form.get("institucion");
  }

  get Pais(){
    return this.form.get("pais");
  }

  get Nota(){
    return this.form.get("nota");
  }

}
