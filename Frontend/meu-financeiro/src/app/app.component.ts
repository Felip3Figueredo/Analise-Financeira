import { Component } from '@angular/core';
import { SidebarService } from './components/sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'meu-financeiro-front';

  constructor(public sidebarService:SidebarService){
    
  }

  toggleSidebar() { 
    this.sidebarService.toggleSidebar();
  }
}
