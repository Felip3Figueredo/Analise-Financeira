import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';
import { SistemaService } from '../../services/sistema.service';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiro';
import { AuthService } from '../../services/auth.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/Categoria';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})

export class CategoriaComponent {
  constructor (public menuService: MenuService, public formBuilder: FormBuilder, public sistemaService: SistemaService, public authService: AuthService, public categoriaService : CategoriaService) {

  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  categoriaForm:FormGroup;
  
  ngOnInit() {
    this.menuService.menuSelecionado = 3

    this.categoriaForm = this.formBuilder.group
    (
      {
        name:['', [Validators.required]],
        sistemaSelect: ['', Validators.required]
      }
    )

    this.ListarSistemasUsuario();
  }

  dadosForm() 
  {
    return this.categoriaForm.controls;
  }

  enviar() 
  {
    debugger
    var dados = this.dadosForm();
    let item = new Categoria();
    
    item.nome = dados["name"].value;
    item.id = 0
    item.IdSistema = parseInt(this.sistemaSelect.id);

    this.categoriaService.AdicionarCategoria(item)
    .subscribe((response: Categoria) => {
  
      this.categoriaForm.reset();
    }, (error) => console.error(error),
      () => { })
  }

  ListarSistemasUsuario() {
    this.sistemaService.ListaSistemasUsuario(this.authService.getEmailUser())
      .subscribe((response : Array<SistemaFinanceiro>) => {
        debugger
        var listaSistemafinanceiro = [];

        response.forEach(x => {
          var item = new SelectModel();
          item.id = x.id.toString().toLowerCase();
          item.nome = x.nome.toLowerCase();

          listaSistemafinanceiro.push(item);
        });

        this.listSistemas = listaSistemafinanceiro;
        } 
      )
  }
}
