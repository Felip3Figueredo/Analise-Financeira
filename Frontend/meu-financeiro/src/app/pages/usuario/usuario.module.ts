import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { UsuarioComponent } from './usuario.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FloatingModule } from '../../floating-button/floating-button.module';

@NgModule(
    {
        providers: [],
        declarations: [UsuarioComponent],
        imports: [
            CommonModule,
            UsuarioRoutingModule,
            NavbarModule,
            SidebarModule,
            ReactiveFormsModule,
            FloatingModule,

            NgxPaginationModule,
            FormsModule,
            NgSelectModule,
            MatIconModule,
            MatSlideToggleModule
        ]
    }
)

export class UsuarioModule { }