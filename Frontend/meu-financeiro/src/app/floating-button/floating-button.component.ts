import { Component } from '@angular/core';
import { SidebarService } from '../components/sidebar/sidebar.service'; 

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent {
  
  constructor(public sidebarService:SidebarService){}
  
  toggleSidebar() {
    this.sidebarService.toggleSidebar()
  }
}
