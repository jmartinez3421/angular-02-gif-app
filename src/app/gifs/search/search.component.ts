import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService){}

  buscar(){    
    let valor = this.txtBuscar.nativeElement.value;

    if(valor.length>0){
      this.gifsService.buscarGifs(valor);
      this.txtBuscar.nativeElement.style.border = '1px solid lightgrey';
    }else{
      this.txtBuscar.nativeElement.style.border = '1px solid red';
    }
    
    
    this.txtBuscar.nativeElement.value = '';
  }
}
