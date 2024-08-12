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

  //1 Listagem. 2 Cadastro. 3 Edição.
  tipoTela: number = 1; 
  tableListCategoria: Array<Categoria>;

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
    this.categoriaForm.reset;
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

  ListaCategoriasUsuario()
  {
    this.tipoTela = 1;

    this.categoriaService.ListarCategoriaUsuario(this.authService.getEmailUser())
    .subscribe((response: Array<Categoria>) => {
      this.tableListCategoria = response;
      
    }, (error) => console.error(error),
      () => { })
  }

  constructor (public menuService: MenuService, public formBuilder: FormBuilder, public sistemaService: SistemaService, public authService: AuthService, public categoriaService : CategoriaService) {

  }

  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();

  categoriaForm:FormGroup;
  
  ngOnInit() {
    this.menuService.menuSelecionado = 3

    this.configpag();
    this.ListaCategoriasUsuario()

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

      this.ListaCategoriasUsuario();
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
