import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CvService } from 'src/app/services/cv.service';
import {FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, map, Observable, startWith } from 'rxjs';
 
@Component({
  selector: 'app-crear-educacion',
  templateUrl: './crear-educacion.component.html',
  styleUrls: ['./crear-educacion.component.css']
})

export class CrearEducacionComponent implements OnInit {
  
  currentUser = sessionStorage.getItem('currentUser');
  personaId: number = 1;
  disableSelect = new FormControl(false);
  form: FormGroup;
  apiPaises: any;
  paises: string[] = [];
  anios: number[] = [];
  nombreInstituciones: any[] = [];
  institucionCtrl = new FormControl('');
  filteredInstituciones: Observable<any[]> = new Observable;
  instituciones: any[] = []

  constructor( 
    private fb:FormBuilder, 
    private service: CvService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar){ 

    this.form = this.fb.group({
      titulo: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(150)]],
      disciplina: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      nota: ["", Validators.min(1)],
      descripcion: ["", ], 
      inicio: ["", Validators.required],
      finalizacion: ["",],
      idInstitucion: ["",],
      institucion: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      pais: ["", ],
      ciudad: ["", ]
    },{validators: [this.validadorAnios]} );
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
      persona: persona,
      titulo: this.form.value.titulo,
      disciplina: this.form.value.disciplina,
      nota: this.form.value.nota,
      descripcion: this.form.value.descripcion,
      inicio: this.form.value.inicio,
      finalizacion: this.form.value.finalizacion,
      actualmenteCursando: this.disableSelect.value,
      institucion: institucion
    }
    
    this.service.postEducacion(educacion).subscribe(data => {
      if(data.status == 201){
        this._snackBar.open('📖  Educación creada correctamente!!!', '', {
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

    for(let i = 1920; i < 2023; i++){
      this.anios.unshift(i);
    }
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
