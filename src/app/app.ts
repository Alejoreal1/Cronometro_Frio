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
    this.sub = this.crono.getTimer().subscribe((value) => { // metodo para obtener el tiempo del cronómetro
      this.time = value;
    });
  }

  stop() {
    this.sub?.unsubscribe();
  }

  reset() {
    this.stop();
    this.time = '00:00:00:000';
  }
}
