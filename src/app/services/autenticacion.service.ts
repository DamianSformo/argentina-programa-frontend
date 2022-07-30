import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  urlL = 'https://arg-pro.herokuapp.com/'
  urlAutenticacion = this.urlL + 'users/authenticate';
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http:HttpClient) {
    this.currentUserSubject= new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'))
   }

   IniciarSesion(credenciales:any):Observable<any>{
    return this.http.post(this.urlAutenticacion, credenciales, {observe: 'response'}).pipe(map(data=>{
      sessionStorage.setItem('currentUser', JSON.stringify(data.body));
      this.currentUserSubject.next(data.body);
      return data;
    }))
   }

   get UsuarioAutenticado() {
    return this.currentUserSubject.value;
   }
}
