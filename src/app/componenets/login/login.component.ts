import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  status: number = 0;
  form: FormGroup;
  hide = true;
 
  constructor(
    private fb: FormBuilder, 
    private serviceAutenticacion: AutenticacionService,
    private ruta: Router){ 

    this.form = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  /*onEnviar(){
    this.serviceAutenticacion.IniciarSesion(this.form.value).subscribe(data=>{

      console.log(data.status);
      
      if(data.status === 200){
      this.ruta.navigate(["/inicio"])
      }
      
    })
  }*/

  onEnviar(){
    this.serviceAutenticacion.IniciarSesion(this.form.value)
    .pipe(finalize(() => {
        if(this.status === 200){
          this.ruta.navigate(["/inicio"])
        } else {
          this.status = 400
        }
    }))
    .subscribe(data => {
      this.status = data.status;
    })
  }


  ngOnInit(): void {
  }

  get Email(){
    return this.form.get("email");
  }

  get Password(){
    return this.form.get("password");
  }

}
