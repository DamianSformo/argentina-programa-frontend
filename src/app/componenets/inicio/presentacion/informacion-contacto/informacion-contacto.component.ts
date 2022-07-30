import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-informacion-contacto',
  templateUrl: './informacion-contacto.component.html',
  styleUrls: ['./informacion-contacto.component.css']
})

export class InformacionContactoComponent implements OnInit {

  persona: any

  constructor(
    public dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

  ngOnInit(): void {
    this.persona = this.data;
    
  }  

  onNoClick(): void {
    this.dialog.closeAll();
  }

}
