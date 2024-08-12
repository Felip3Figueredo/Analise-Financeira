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

    //1 Listagem. 2 Cadastro. 3 Edição.
    tipoTela: number = 1; 
    tableListDespesas: Array<Despesa>;
  
    id: string;
    page : number = 1;
    config: any;
    paginacao: boolean = true;
    itemsPorPagina: number = 10;
  
    configpag() {
      this.id = this.gerarIdParaConfigDePaginacao();
  
      this.config = {
        id: this.id,
        currentPage: this.page,
        itemsPerPage: this.itemsPorPagina
      };
    }
  
    cadastro()
    {
      this.tipoTela = 2;
      this.despesaForm.reset;
    }
  
    mudarItemsPorPage() {
      this.page = 1;
      this.config.currentPage = this.page;
      this.config.itemsPerPage = this.itemsPorPagina;
    }
  
    mudarPage(event: any) {
      this.page = event;
      this.config.currentPage = this.page;
    }
    
    gerarIdParaConfigDePaginacao() {
      var result = '';
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() *
          charactersLength));
      }
      return result;
    }
  
    ListaDespesas()
    {
      this.tipoTela = 1;
  
      this.despesaService.ListarDespesaUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<Despesa>) => {
        this.tableListDespesas = response;
        
      }, (error) => console.error(error),
        () => { })
    }
  

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

    this.configpag();
    this.ListaDespesas();
    this.despesaForm = this.formBuilder.group
    (
      {
        name:['', [Validators.required]],
        valor:['', [Validators.required]],
        data:['', [Validators.required]],
        sistemaSelect:['', [Validators.required]],
        categoriaSelect:['', [Validators.required]]
      }
    ),

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
    
    item.nome = dados["name"].value;
    item.valor = dados["valor"].value;
    item.pago = this.checked;
    item.dataVencimento = dados["data"].value;
    
    item.idCategoria = parseInt(this.categoriaSelect.id);

    this.despesaService.AdicionarDespesa(item)
    .subscribe((response: Despesa) => {
      
      this.despesaForm.reset();
      this.ListaDespesas();
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
          item.nome = x.nome;

          listaCategoria.push(item);
        });

        this.listCategorias = listaCategoria;
        } 
      )
  }
}
