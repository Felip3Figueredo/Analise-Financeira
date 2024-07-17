import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { DespesaRoutingModule } from './despesa-routing.module';
import { DespesaComponent } from './despesa.component';

@NgModule(
    {
        providers:[],
        declarations:[DespesaComponent],
        imports:[
            CommonModule,
            DespesaRoutingModule,
            NavbarModule,
            SidebarModule
        ]
    }
)

export class DespesaModule{}