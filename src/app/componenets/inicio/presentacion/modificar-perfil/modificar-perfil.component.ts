import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CvService } from 'src/app/services/cv.service';
import { Persona } from '../persona';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.css']
})
export class ModificarPerfilComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb:FormBuilder,
    private datas: CvService,
    public dialog: MatDialog, 
    private _snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public data: Persona
   
    ) { 
      this.form = this.fb.group({
        
        nombre: [this.data.nombre, Validators.required],
        apellido: [this.data.apellido, Validators.required],
        descripcion: [this.data.descripcion, Validators.required],
        buscandoTrabajo: [this.data.buscandoTrabajo, ],
        pais: [this.data.direccion.pais],
        ciudad: [this.data.direccion.ciudad],
      })
    } 

    guardarPresentacion(){
      const direccion = {
        id: this.data.direccion.id,
        direccion: this.data.direccion.direccion,
        codigoPostal: this.data.direccion.codigoPostal,
        ciudad: this.form.value.ciudad,
        pais: this.form.value.pais,
      }
      const presentacion = {
        id: this.data.id,
        nombre: this.form.value.nombre ,
        apellido: this.form.value.apellido,
        tipoDocumento: this.data.tipoDocumento,
        numeroDocumento: this.data.numeroDocumento,
        descripcion: this.form.value.descripcion,
        buscandoTrabajo: this.form.value.buscandoTrabajo,
        verEmail: this.data.verEmail,
        numeroWhatsapp: this.data.numeroWhatsapp,
        verNumeroWhatsapp: this.data.verNumeroWhatsapp,
        verDireccion: this.data.verDireccion,
        direccion: direccion,
        linkedin: this.data.linkedin,
        verLinkedin: this.data.verLinkedin,
        banner: this.data.banner
      }

      this.datas.postPersona(presentacion).subscribe(data => {
        
        if(data.status == 200){
          this._snackBar.open('😁  Presentación actualizada correctamente!!!', '', {
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
      console.log(this.data);
    }
    
    get Nombre(){
      return this.form.get("nombre");
    }

    get Apellido(){
      return this.form.get("apellido");
    }

    get Descripcion(){
      return this.form.get("descripcion");
    }

    get Pais(){
      return this.form.get("pais");
    }

    get Ciudad(){
      return this.form.get("ciudad");
    }
    
    }
