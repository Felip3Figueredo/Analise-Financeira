import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { SelectModel } from '../../models/SelectModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaService } from '../../services/sistema.service';
import { AuthService } from '../../services/auth.service';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiro';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/Categoria';
import { Despesa } from '../../models/Despesa';
import { DespesaService } from '../../services/despesa.service';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrl: './despesa.component.scss'
})
export class DespesaComponent {
  constructor (public menuService: MenuService, public formBuilder: FormBuilder, public sistemaService: SistemaService, public authService: AuthService, public categoriaService: CategoriaService, public despesaService: DespesaService) {

  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();

  color = 'accent';
  checked = false;
  disabled = false;

  despesaForm:FormGroup;
  
  ngOnInit() {
    this.menuService.menuSelecionado = 4

    this.despesaForm = this.formBuilder.group
    (
      {
        name:['', [Validators.required]],
        valor:['', [Validators.required]],
        data:['', [Validators.required]],
        sistemaSelect:['', [Validators.required]],
        categoriaSelect:['', [Validators.required]]
      }
    )

    this.ListarCategoriaUsuario();
  }

  dadosForm() 
  {
    return this.despesaForm.controls;
  }

  handleChangePago(item: any) {
    this.checked = item.checked as boolean
  }

  enviar() 
  {
    debugger
    var dados = this.dadosForm();
    let item = new Despesa();
    
    item.Nome = dados["name"].value;
    item.Id = 0
    item.valor = dados["valor"].value;
    item.pago = this.checked;
    item.dataVencimento = dados["data"].value;
    
    item.idCategoria = parseInt(this.categoriaSelect.id);

    this.despesaService.AdicionarDespesa(item)
    .subscribe((response: Despesa) => {
  
      this.despesaForm.reset();
    }, (error) => console.error(error),
      () => { })
  }

  ListarCategoriaUsuario() {
    this.categoriaService.ListarCategoriaUsuario(this.authService.getEmailUser())
      .subscribe((response : Array<Categoria>) => {
        debugger
        var listaCategoria = [];

        response.forEach(x => {
          var item = new SelectModel();
          item.id = x.id.toString();
          item.nome = x.nome.toLowerCase();

          listaCategoria.push(item);
        });

        this.listCategorias = listaCategoria;
        } 
      )
  }
}
