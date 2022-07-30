import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CvService } from 'src/app/services/cv.service';
import { Persona } from '../persona';

@Component({
  selector: 'app-modificar-banner',
  templateUrl: './modificar-banner.component.html',
  styleUrls: ['./modificar-banner.component.css']
})
export class ModificarBannerComponent implements OnInit {



  form: FormGroup;

  constructor(
    private fb:FormBuilder,
    private datas: CvService,
    public dialog: MatDialog, 
    private _snackBar: MatSnackBar,

    @Inject(MAT_DIALOG_DATA) public data: Persona
   
    ) { 
      this.form = this.fb.group({
        banner: [this.data.banner, Validators.required],
      })
    } 

    guardarPresentacion(){
      const presentacion = {
        id: this.data.id,
        nombre: this.data.nombre ,
        apellido: this.data.apellido,
        tipoDocumento: this.data.tipoDocumento,
        numeroDocumento: this.data.numeroDocumento,
        descripcion: this.data.descripcion,
        buscandoTrabajo: this.data.buscandoTrabajo,
        verEmail: this.data.verEmail,
        numeroWhatsapp: this.data.numeroWhatsapp,
        verNumeroWhatsapp: this.data.verNumeroWhatsapp,
        verDireccion: this.data.verDireccion,
        direccion: this.data.direccion,
        linkedin: this.data.linkedin,
        verLinkedin: this.data.verLinkedin,
        banner: this.form.value.banner
      }

      this.datas.postPersona(presentacion).subscribe(data => {
        
        if(data.status == 200){
          this._snackBar.open('🖼️  Banner actualizado correctamente!!!', '', {
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
    
    }
