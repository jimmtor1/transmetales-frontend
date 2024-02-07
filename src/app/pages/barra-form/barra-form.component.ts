import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraService } from '../../service/compra.service';
import { Compra } from '../../model/compra';
import { Barra } from '../../model/barra';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-barra-form',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './barra-form.component.html',
  styleUrl: './barra-form.component.css'
})
export class BarraFormComponent implements OnInit {

  constructor(private compraService: CompraService) { }

  compras: Compra[] = [];
  totalGramos: number = 0;
  totalLeyoro: number = 0;
  totalLeyplata: number = 0;

  ngOnInit(): void {
    this.comprasNoFundidas();
  }

  comprasNoFundidas() {

    this.compraService.comprasNoFundidas().subscribe(x => {
      x.forEach(c => { c.select = false });
      this.compras = x;
    });

  }

  seleccionarCompra(id: number) {
    const compra = this.compras.find(d => d.id == id)
    compra!.select = !compra?.select;
    this.sumaGramosLeyes();
  }

  sumaGramosLeyes() {
    this.totalGramos = 0;
    this.totalLeyoro = 0;
    this.totalLeyplata = 0;
    for (let index = 0; index < this.compras.length; index++) {
      if (this.compras[index].select) {
        this.totalGramos += this.compras[index].gramos;
        this.totalLeyoro += this.compras[index].leyOro;
        this.totalLeyplata += this.compras[index].leyPlata;
      }
    }
  }

  submit(){
    const barra : Barra = {
      gramos : this.totalGramos,
      leyOro : this.totalLeyoro,
      leyPlata : this.totalLeyplata
    }

    const ids: number[] = [];
    for (let index = 0; index < this.compras.length; index++) {
      if (this.compras[index].select) {
        ids.push(this.compras[index].id!);
      }
    }

    this.compraService.fundirCompra(barra,ids).subscribe(x=>{
      if(x.id){
        alert("Barra guardada");
        this.comprasNoFundidas();
      }
    });
  }

}
