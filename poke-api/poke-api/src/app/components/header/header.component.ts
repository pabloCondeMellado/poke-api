import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) { }  // Inyectar el router

  // Función para redirigir al home
  navigateToHome(): void {
    this.router.navigate(['/']);  // Redirige al inicio (home)
  }
}
