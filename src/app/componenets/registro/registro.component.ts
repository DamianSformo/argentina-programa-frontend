import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, finalize } from 'rxjs';
import { CvService } from 'src/app/services/cv.service';
import { Validaciones } from './validaciones';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  hide = true;
  hideDos = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  currentUserSubject: BehaviorSubject<any>;
  isLinear = false;

  apiPaises: any;
  paises: string[] = [];

  emails: string[] = [];

  banner: string = 'assets/images/fondo-ond.webp';

  constructor(
    private fb: FormBuilder,
    private service: CvService,
    private ruta: Router,){

      this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));

      this.firstFormGroup = this.fb.group({
        nombre: ["", [Validators.required]],
        apellido: ["",  Validators.required],
        tipoDocumento: ["", ],
        numeroDocumento: ["", ],
        descripcion: ["", Validators.required],
        direccion: ["", ],
        codigoPostal: ["", Validators.required],
        ciudad: ["", Validators.required],
        pais: ["", Validators.required],
      });

      this.secondFormGroup = this.fb.group({
        email: ['', [Validaciones.mail(this.emails), Validators.required, Validators.email]],
        password: ['', [Validators.pattern('(?=.*[-!#$%&/()?¡_])(?=.*[aA-zZ])(?=.*[0-9]).{6,}'), Validators.required, Validators.minLength(6)]],
        repassword: ['', [Validators.required]],
      }, {validators: [this.passwordMatchValidator]} );
    }

  guardarUsuario(){
    const direccion = {
      direccion: this.firstFormGroup.value.direccion,
      codigoPostal: this.firstFormGroup.value.codigoPostal,
      ciudad: this.firstFormGroup.value.ciudad,
      pais: this.firstFormGroup.value.pais
    }

    const usuarioPersona ={
      nombre: this.firstFormGroup.value.nombre,
      apellido:this.firstFormGroup.value.apellido,
      tipoDocumento:this.firstFormGroup.value.tipoDocumento,
      numeroDocumento: this.firstFormGroup.value.numeroDocumento,
      descripcion: this.firstFormGroup.value.descripcion,
      direccion: direccion,
      calle: this.firstFormGroup.value.direccion,
      codigoPostal: this.firstFormGroup.value.codigoPostal,
      ciudad: this.firstFormGroup.value.ciudad,
      pais: this.firstFormGroup.value.pais,
      email: this.secondFormGroup.value.email,
      password: this.secondFormGroup.value.password,
      verDireccion: true,
      verNumeroWhatsapp: false,
      verLinkedin: false,
      verEmail: true,
      banner: this.banner,
    }

    this.service.postUsuario(usuarioPersona).subscribe(data=>{
      if(data.status == 201){
        sessionStorage.setItem('currentUser', JSON.stringify(data.body));
        this.currentUserSubject.next(data.body);
        this.ruta.navigate(["/inicio"])
        console.log(usuarioPersona);
      } else {
        console.log("fallo");
      }
    })
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

  traerEmails(){
    this.service.getEmails()
    .pipe(finalize(() => {
      this.emails = this.emails.sort();
    }))
    .subscribe(data => {
      var cont = 0;
      data.body.forEach(function() {
        cont++;
      })
      for(let i = 0 ; i < cont ; i++){
        this.emails.push(data.body[i])
      }})
  }

  ngOnInit(): void {
    this.traerPaises();
    this.traerEmails();
  }

  passwordMatchValidator(control: AbstractControl) {
    const password: string = control.value.password;
    const repassword: string = control.value.repassword;
    if (password !== repassword) {
      const rp = control.get('repassword');
      if(rp != null){
        rp.setErrors({ NoPasswordMatch: true });
      }
    }
  }

  

  get Descripcion(){
    return this.firstFormGroup.get("descripcion");
  }

  get Nombre(){
    return this.firstFormGroup.get("nombre");
  }

  get Apellido(){
    return this.firstFormGroup.get("apellido");
  }

  get FistFormGroup(){
    return this.firstFormGroup.controls;
  }

  get Email(){
    return this.secondFormGroup.get("email");
  }

  get Password(){
    return this.secondFormGroup.get("password");
  }

  get TipoDocumento(){
    return this.firstFormGroup.get("tipoDocumento");
  }

  get NumeroDocumento(){
    return this.firstFormGroup.get("numeroDocumento");
  }

  get Direccion(){
    return this.firstFormGroup.get("direccion");
  }
  
  get CodigoPostal(){
    return this.firstFormGroup.get("codigoPostal");
  }

  get Ciudad(){
    return this.firstFormGroup.get("ciudad");
  }

  get Pais(){
    return this.firstFormGroup.get("pais");
  }
}
