import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { SistemaComponent } from './sistema.component';
import { SistemaRoutingModule } from './sistema-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination'
import { MatIconModule } from '@angular/material/icon'
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule(
    {
        providers: [],
        declarations: [SistemaComponent],
        imports: [
            CommonModule,
            SistemaRoutingModule,
            NavbarModule,
            SidebarModule,
            ReactiveFormsModule,
            NgxPaginationModule, 
            MatIconModule,
            FormsModule,
            NgSelectModule,
            MatSlideToggleModule
        ]
    }
)

export class SistemaModule{}