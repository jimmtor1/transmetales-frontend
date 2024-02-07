import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineroService } from '../../service/minero.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompraService } from '../../service/compra.service';
import { Compra } from '../../model/compra';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-compra-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './compra-form.component.html',
  styleUrl: './compra-form.component.css'
})
export class CompraFormComponent {

  constructor(private mineroService: MineroService, private compraService: CompraService) { }

  cedula: string = "";
  nombreMinero: string = "";
  idminero:number|undefined;
  finosau = 0;
  finosag = 0;

  compraForm = new FormGroup({
    idminero: new FormControl(),
    idbarra: new FormControl(),
    mineral: new FormControl(0),
    gramos: new FormControl(),
    leyPlata: new FormControl(),
    leyOro: new FormControl(),
    precio: new FormControl(),
  })

  getMineroName() {
    if (this.cedula != "") {
      this.mineroService.obtenerCompraPorCedula(this.cedula).subscribe(p => {
        this.nombreMinero = p.nombres! + " " + p.apellidos; 
        this.idminero = p.id;     
      })
    }
  }

  submit() {
    if (this.compraForm.valid) {
      this.compraForm.value.idminero = this.idminero;
      console.log(this.compraForm.value);
      this.compraService.insertarCompra(<Compra>this.compraForm.value).subscribe(x => {
        if (x.id) {
          alert("Compra guardada");
        }
      });
    }
  }

  calcFinosau(){

    if(this.compraForm.value.gramos!=null && this.compraForm.value.leyOro!=null){

      const gramos = this.compraForm.value.gramos;
      const leyau = this.compraForm.value.leyOro;

      this.finosau = (gramos * leyau)/1000;

    }

  }

  calcFinosag(){

    if(this.compraForm.value.gramos!=null && this.compraForm.value.leyPlata!=null){

      const gramos = this.compraForm.value.gramos;
      const leyag = this.compraForm.value.leyPlata;

      this.finosag = (gramos * leyag)/1000;

    }

  }


}
