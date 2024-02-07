import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Barra } from '../../model/barra';
import { CompraService } from '../../service/compra.service';
import { Traslado } from '../../model/traslado';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-traslado-form',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './traslado-form.component.html',
  styleUrl: './traslado-form.component.css'
})
export class TrasladoFormComponent implements OnInit {

  barras: Barra[] = [];

  constructor(private compraService: CompraService) { }

  ngOnInit(): void {
    this.barrasNoTrasladadas();
  }

  barrasNoTrasladadas() {

    this.compraService.barrasNoTrasladadas().subscribe(x => {
      x.forEach(c => { c.select = false });
      this.barras = x;
    });

  }

  seleccionarBarra(id: number) {
    const compra = this.barras.find(d => d.id == id)
    compra!.select = !compra?.select;    
  }
 
  submit(){
    const traslado : Traslado = {
      estado : true,
      fechaEnvio :new Date()      
    }

    const ids: number[] = [];
    for (let index = 0; index < this.barras.length; index++) {
      if (this.barras[index].select) {
        ids.push(this.barras[index].id!);
      }
    }

    this.compraService.trasladarBarra(traslado,ids).subscribe(x=>{
      if(x.id){
        alert("Traslado guardado");
        this.barrasNoTrasladadas();        
      }
    });
  }

}
