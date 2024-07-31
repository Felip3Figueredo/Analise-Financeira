import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { DespesaRoutingModule } from './despesa-routing.module';
import { DespesaComponent } from './despesa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

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
            NgSelectModule
        ]
    }
)

export class DespesaModule{}