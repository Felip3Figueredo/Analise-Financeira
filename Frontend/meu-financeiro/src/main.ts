import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { SidebarService } from './app/components/sidebar/sidebar.service';

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));

export class MainTs{
  constructor(public sidebarService: SidebarService){

  }

  toggleSidebar() { 
    this.sidebarService.toggleSidebar();
  }
}
  