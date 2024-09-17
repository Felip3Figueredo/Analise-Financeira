import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { FloatingModule } from '../../floating-button/floating-button.module';

@NgModule(
    {
        providers:[],
        declarations:[DashboardComponent],
        imports:[
            CommonModule,
            DashboardRoutingModule,
            NavbarModule,
            SidebarModule,
            FloatingModule
        ]
    }
)

export class DashboardModule{}