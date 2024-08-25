import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isSidebarCollapsed = false;

  constructor(private router: Router, public menuService: MenuService, private sidebarService: SidebarService, private elementRef: ElementRef ) {}

  ngOnInit() {
    this.sidebarService.sidebarCollapsed$.subscribe(collapsed => {
      this.isSidebarCollapsed = collapsed;
    });
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Verifica se o clique foi fora da sidebar
    if (!target.closest('.container-sidebar') && !target.closest('.floating-button')) {
      this.sidebarService.setSidebarCollapsed(true);
    }
  }
  
  selectMenu(menu: number) {
    this.menuService.menuSelecionado = menu;
    switch (menu) {
      case 1:
        this.router.navigate(['/dashboard']);
        break;
      case 2:
        this.router.navigate(['/sistema']);
        break;
      case 3:
        this.router.navigate(['/categoria']);
        break;
      case 4:
        this.router.navigate(['/despesa']);
        break;
      case 5:
        this.router.navigate(['/usuario']);
        break;
      case 100: 
        localStorage.clear();
        this.router.navigate(['/login']);
        break;
      default:
        break;
    }
    this.menuService.menuSelecionado = menu;
  }
}
