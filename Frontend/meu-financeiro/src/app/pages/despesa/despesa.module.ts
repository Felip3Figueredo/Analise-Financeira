import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { DespesaRoutingModule } from './despesa-routing.module';
import { DespesaComponent } from './despesa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { FloatingModule } from '../../floating-button/floating-button.module';

@NgModule(
    {
        providers:[],
        declarations:[DespesaComponent],
        imports:[
            CommonModule,
            DespesaRoutingModule,
            NavbarModule,
            SidebarModule,
            FormsModule,
            ReactiveFormsModule,
            NgSelectModule,
            ReactiveFormsModule,
            MatSlideToggleModule,
            NgxPaginationModule, 
            MatIconModule,
            FormsModule,
            FloatingModule
        ]
    }
)

export class DespesaModule{}