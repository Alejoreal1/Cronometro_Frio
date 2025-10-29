import { Component, OnDestroy } from '@angular/core';
import { CronoService } from './services/crono-service.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true, //  Si estás usando componentes standalone
  imports: [],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // 
})
export class App implements OnDestroy {

  time = '00:00:00:000'; //  Inicializamos con ceros
  sub?: Subscription;

  constructor(private crono: CronoService) {}

  start() {
    // Evitar iniciar múltiples veces
    if (this.sub && !this.sub.closed) return;

    // Iniciar suscripción
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
    this.stop(); //  Detiene el contador
    this.time = '00:00:00:000'; 
    this.start()
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
