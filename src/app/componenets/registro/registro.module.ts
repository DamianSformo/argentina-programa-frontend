import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RegistroComponent } from './registro.component';

@NgModule({
  declarations: [
    RegistroComponent,
    
  ],
  imports: [
    CommonModule, 
    SharedModule
  ]
})
export class RegistroModule { }
