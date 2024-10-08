import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { DespesaService } from '../../services/despesa.service';
import { AuthService } from '../../services/auth.service';
import { SistemaService } from '../../services/sistema.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

export class DashboardComponent {
  
  constructor(public menuService: MenuService
    , public despesaService: DespesaService
    , public authService: AuthService
    , public sistemaService: SistemaService) {
  }

  ngOnInit() {
    this.menuService.menuSelecionado = 1;
    this.CarregaGraficos();
  }

  objetoGrafico: any;

  CarregaGraficos()
  {
    debugger
    this.despesaService.CarregaGraficos(this.authService.getEmailUser())
      .subscribe((response: any) => {
        debugger
        this.objetoGrafico = response;
      }, 
      (error) => console.error(error),
        () => {}
      )

  }

  ExecuteCopiaDespesasSistemaFinanceiro()
  {
    this.sistemaService.ExecuteCopiaDespesasSistemaFinanceiro()
      .subscribe((response: any) => {
        alert("Executado com sucesso!")
      })
  }
}
