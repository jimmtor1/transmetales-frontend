import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineroService } from '../../service/minero.service';
import { Minero } from '../../model/minero';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-minero-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './minero-form.component.html',
  styleUrl: './minero-form.component.css'
})
export class MineroFormComponent {

  constructor(private mineroService: MineroService) { }

  mineroForm = new FormGroup({
    tipoMinero: new FormControl(0, Validators.required),
    vencimientoRut: new FormControl('', Validators.required),
    certificacionAlcaldia: new FormControl(''),
    estado: new FormControl(1),
    gramosComprados: new FormControl(0),

    persona: new FormGroup({
      nombres: new FormControl(''),
      apellidos: new FormControl(''),
      tipoDocumento: new FormControl(0),
      numDocumento: new FormControl(),
      direccion: new FormControl(''),
      telefono: new FormControl(''),
      email: new FormControl(''),
    })
  });


  submit() {

    if (this.mineroForm.valid) {
      this.mineroService.insertarMinero( <Minero> this.mineroForm.value).subscribe(x => {
        if(x.id){
          alert("Minero guardado");
        }        
      });
    }

  }


}
