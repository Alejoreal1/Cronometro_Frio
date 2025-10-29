import { Component, OnDestroy } from '@angular/core';
import { CronoService } from './services/crono-service.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  time = '';
  sub: Subscription | undefined;

  constructor(private crono: CronoService) {}
  start() {
    //  Validar si ya hay una suscripción activa (cronómetro en marcha)
    if (this.sub && !this.sub.closed) {

      return;
    }

    //  Crear una nueva suscripción solo si no hay una activa
    this.sub = this.crono.getTimer().subscribe((value: string) => {
      this.time = value;
    });
  }

  stop() {
    if (this.sub && !this.sub.closed) {
      this.sub.unsubscribe();
    }
  }

  reset() {
    this.stop();
    this.time = '00:00:00:000';
  }
}
