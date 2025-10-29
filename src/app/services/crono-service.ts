import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CronoService {
// para las buenes practica se utilkza el $ al final de la variable que contiene un Observable
    // Observable frío: no emite hasta que alguien se suscriba
  private base$: Observable<string> = interval(10).pipe( // cada 10ms 
    map((value) => {
      const totalMs = value * 10; 
      const hours = Math.floor(totalMs / 3600000);
      const minutes = Math.floor((totalMs % 3600000) / 60000);
      const seconds = Math.floor((totalMs % 60000) / 1000);
      const milliseconds = totalMs % 1000;

      // devolvemos un string formateado, para dar el formato de hora  ej: 00:01:12.230
      return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}:${this.padMs(milliseconds)}`;
    })
  );

  constructor() {}

  // para que puedas acceder desde el componente
  getTimer(): Observable<string> {
    return this.base$;
  }

  private pad(num: number): string {
    return num < 10 ? '0' + num : num.toString(); // operardor ternario 
  }

  private padMs(num: number): string {
    if (num < 10) return '00' + num;
    if (num < 100) return '0' + num;
    return num.toString();
  }
}