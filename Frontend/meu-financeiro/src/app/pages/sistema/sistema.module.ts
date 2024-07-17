import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { SistemaComponent } from './sistema.component';
import { SistemaRoutingModule } from './sistema-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule(
    {
        providers: [],
        declarations: [SistemaComponent],
        imports: [
            CommonModule,
            SistemaRoutingModule,
            NavbarModule,
            SidebarModule,
            ReactiveFormsModule
        ]
    }
)

export class SistemaModule{}