import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingButtonComponent } from './floating-button.component';
import { FloatingRoutingModule } from './floating-routing.module';
import { NavbarModule } from '../components/navbar/navbar.module';
import { SidebarModule } from '../components/sidebar/sidebar.module';

@NgModule(
    {
        providers:[],
        declarations:[],
        imports:[
            CommonModule,
            FloatingRoutingModule,
            NavbarModule,
            SidebarModule
        ]
    }
)

export class FloatingModule{}