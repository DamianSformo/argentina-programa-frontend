import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  //url = 'http://localhost:8080/'
  url = 'https://arg-pro.herokuapp.com/'
  urlAutenticacion = this.url + 'users/authenticate'

  // +++ EDUCACION +++ //

  urlGetEducacionInicio = this.url + 'educacion/inicio/'
  urlGetEducacionCompleto = this.url + 'educacion/completo/'
  urlPostEducacion = this.url + 'educacion/'
  urlDeleteEducacion = this.url + 'educacion/'
  urlGetInstituciones = this.url + 'institucion'

  // +++ EXPERIENCIA +++ //

  urlGetExperienciaInicio = this.url + 'experiencia/presentacion/'
  urlGetExperienciaCompleto = this.url + 'experiencia/completo/'
  urlPostExperiencia = this.url + 'experiencia/'
  urlDeleteExperiencia = this.url + 'experiencia/eliminar/'

  // +++ CONOCIMIENTO +++ //

  urlGetConocimientoPresentacion = this.url + 'personaconocimiento/inicio/'
  urlPostConocimiento = this.url + 'personaconocimiento/'
  urlDeleteConocimiento = this.url + 'personaconocimiento/eliminar/'

  // +++ IDIOMA +++ //

  urlGetIdiomaInicio = this.url + 'personaidioma/inicio/'
  urlPostIdioma = this.url + 'personaidioma/'
  urlDeleteIdioma = this.url + 'personaidioma/eliminar/'

  urlGetIdiomas = this.url + 'idioma'

  // +++ PERSONA +++ //

  urlPostPersona = 'https://arg-pro.herokuapp.com/persona/'
  urlGetPersona = this.url + 'persona/inicio/'
  urlGetPersonaHeader = this.url + 'persona/header/'

  // +++ USUARIO +++ //

  urlPostUsuario = this.url + 'users/registro'


  constructor( private http:HttpClient) {}

  postAutenticacion(usuario: any): Observable<any>{
    return this.http.post(this.urlAutenticacion, usuario);
  }

  
  // +++ EDUCACION +++ //

  getEducacionInicio(id: number): Observable<any>{
    return this.http.get(this.urlGetEducacionInicio + id, {observe: 'response'});
  }

  getEducacionCompleto(id: number): Observable<any>{
    return this.http.get(this.urlGetEducacionCompleto + id, {observe: 'response'});
  }

  postEducacion(edu: any): Observable<any>{
    return this.http.post(this.urlPostEducacion, edu, {observe: 'response'});
  }

  deleteEducacion(id: number): Observable<any>{
    return this.http.delete(this.urlDeleteEducacion + id)
  }

  getInstituciones(): Observable<any>{
    return this.http.get(this.urlGetInstituciones)
  }


  // +++ EXPERIENCIA +++ //

  getExperienciaPresentacion(id: number): Observable<any>{
    return this.http.get(this.urlGetExperienciaInicio + id, {observe: 'response'});
  }

  getExperienciaCompleto(id: number): Observable<any>{
    return this.http.get(this.urlGetExperienciaCompleto + id, {observe: 'response'});
  }

  postExperiencia(experiencia: any): Observable<any>{
    return this.http.post(this.urlPostExperiencia, experiencia, {observe: 'response'});
  }

  deleteExperiencia(id: number): Observable<any>{
    return this.http.delete(this.urlDeleteExperiencia + id)
  }


  // +++ CONOCIMIENTO +++ //

  getConocimientoPresentacion(id: number): Observable<any>{
    return this.http.get(this.urlGetConocimientoPresentacion + id)
  }

  postConocimiento(conocimiento: any): Observable<any>{
    return this.http.post(this.urlPostConocimiento, conocimiento, {observe: 'response'});
  }

  deleteConocimiento(id: number): Observable<any>{
    return this.http.delete(this.urlDeleteConocimiento + id)
  }


  // +++ IDIOMA +++ //

  getIdioma(id: number): Observable<any>{
    return this.http.get(this.urlGetIdiomaInicio + id, {observe: 'response'})
  }

  postIdioma(idioma: any): Observable<any>{
    return this.http.post(this.urlPostIdioma, idioma, {observe: 'response'});
  }
  
  deleteIdioma(id: number): Observable<any>{
    return this.http.delete(this.urlDeleteIdioma + id)
  }

  getIdiomas(): Observable<any>{
    return this.http.get(this.urlGetIdiomas)
  }

  // +++ PERSONA +++ //

  postPersona(persona: any): Observable<any>{
    return this.http.post(this.urlPostPersona, persona, {observe: 'response'});
  }

  getPersona(id: number): Observable<any>{
    return this.http.get(this.urlGetPersona + id, {observe: 'response'})
  }

  getPersonaHeader(id: number): Observable<any>{
    return this.http.get(this.urlGetPersonaHeader + id, {observe: 'response'})
  }

  // +++ USUARIO +++ //

    postUsuario(usuario: any): Observable<any>{
      return this.http.post(this.urlPostUsuario, usuario, {observe: 'response'});
    }

  // +++ PAIS +++ //

  getPais(): Observable<any>{
    return this.http.get("https://restcountries.com/v3.1/all", {observe: 'response'});
  }

  // +++ EMAILS +++ //

  getEmails(): Observable<any>{
    return this.http.get("https://arg-pro.herokuapp.com/users/emails", {observe: 'response'});
  }
  
}
