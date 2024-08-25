import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarCollapsedSubject = new BehaviorSubject<boolean>(true);
  sidebarCollapsed$ = this.sidebarCollapsedSubject.asObservable();

  
  toggleSidebar() {
    this.sidebarCollapsedSubject.next(!this.sidebarCollapsedSubject.value);
  }

  setSidebarCollapsed(collapsed: boolean) {
    this.sidebarCollapsedSubject.next(collapsed);
  }
}
