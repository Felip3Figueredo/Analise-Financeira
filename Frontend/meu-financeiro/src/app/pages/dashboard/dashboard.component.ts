import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  
  constructor(public menuService: MenuService) {

  }

  ngOnInit() {
    this.menuService.menuSelecionado = 1
  }
}
