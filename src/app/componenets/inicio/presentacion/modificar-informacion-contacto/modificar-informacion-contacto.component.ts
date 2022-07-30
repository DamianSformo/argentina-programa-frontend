import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-modificar-informacion-contacto',
  templateUrl: './modificar-informacion-contacto.component.html',
  styleUrls: ['./modificar-informacion-contacto.component.css']
})
export class ModificarInformacionContactoComponent implements OnInit {

  disableSelect = new FormControl().disable();
  stateCtrl = new FormControl(true);

  toggleEmail = new FormControl(this.data.verEmail);
  toggleNumeroWhatsapp = new FormControl(this.data.verNumeroWhatsapp);
  toggleDireccion = new FormControl(this.data.verDireccion);
  toggleLinkedin = new FormControl(this.data.verLinkedin);

  diasabled = true;
  disalbeShipping = true;
  currentUser = sessionStorage.getItem('currentUser');
  personaEmail: string = "damiansformo@gmail.com";

  form: FormGroup;

  constructor(
    private fb:FormBuilder,
    private datas: CvService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){ 
      this.form = this.fb.group({
        email: [{value: this.currentUser ? this.data.email : "damiansformo@gmail.com", disabled: true}],
        verEmail: [this.data.verEmail,],
        numeroWhatsapp: [{value: this.data.numeroWhatsapp, disabled: !this.toggleNumeroWhatsapp.value}],
        verNumeroWhatsapp: [this.data.verNumeroWhatsapp,],
        direccion: [{value: this.data.direccion.direccion, disabled: !this.toggleDireccion.value}],
        verDireccion: [this.data.verDireccion, ],
        linkedin: [{value: this.data.linkedin, disabled: !this.toggleLinkedin.value}],
        verLinkedin: [this.data.verLinkedin,]
      })
    } 

  clickNumeroWhatsapp(){
    if(!this.toggleNumeroWhatsapp.value){
      this.form.get("numeroWhatsapp")?.enable();
    }
    if(this.toggleNumeroWhatsapp.value){
      this.form.get("numeroWhatsapp")?.disable();
    }
  }

  clickDireccion(){
    if(!this.toggleDireccion.value){
      this.form.get("direccion")?.enable();
    }
    if(this.toggleDireccion.value){
      this.form.get("direccion")?.disable();
    }
  }

  clickLinkedin(){
    if(!this.toggleLinkedin.value){
      this.form.get("linkedin")?.enable();
    }
    if(this.toggleLinkedin.value){
      this.form.get("linkedin")?.disable();
    }
  }

  guardarPresentacion(){
    const direccion = {
      id: this.data.direccion.id,
      direccion: this.toggleDireccion.value ? this.form.value.direccion : this.data.direccion.direccion,
      codigoPostal: this.data.direccion.codigoPostal,
      ciudad: this.data.direccion.ciudad,
      pais: this.data.direccion.pais,
    }
    const presentacion = {
      id: this.data.id,
      nombre: this.data.nombre ,
      apellido: this.data.apellido,
      tipoDocumento: this.data.tipoDocumento,
      numeroDocumento: this.data.numeroDocumento,
      descripcion: this.data.descripcion,
      buscandoTrabajo: this.data.buscandoTrabajo,
      verEmail: this.toggleEmail.value,
      numeroWhatsapp: this.toggleNumeroWhatsapp.value ? this.form.value.numeroWhatsapp : this.data.numeroWhatsapp,
      verNumeroWhatsapp: this.toggleNumeroWhatsapp.value,
      verDireccion: this.toggleDireccion.value,
      direccion: direccion,
      linkedin: this.toggleLinkedin.value ? this.form.value.linkedin : this.data.linkedin,
      verLinkedin: this.toggleLinkedin.value,
      banner: this.data.banner
    }

    this.datas.postPersona(presentacion).subscribe(data => {
        
      if(data.status == 200){
        this._snackBar.open('📧  Información de contacto actualizada correctamente!!!', '', {
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
}

