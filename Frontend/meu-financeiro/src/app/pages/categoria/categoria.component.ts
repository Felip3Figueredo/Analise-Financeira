import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModel } from '../../models/SelectModel';
import { SistemaService } from '../../services/sistema.service';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiro';
import { AuthService } from '../../services/auth.service';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../models/Categoria';
import { DespesaService } from '../../services/despesa.service';

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
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.categoriaService.ListarCategoriaUsuario(this.authService.getEmailUser())
    .subscribe((response: Array<Categoria>) => {
      this.tableListCategoria = response;
      
    }, (error) => console.error(error),
      () => { })
  }

  constructor (public menuService: MenuService
    , public formBuilder: FormBuilder
    , public sistemaService: SistemaService
    , public authService: AuthService
    , public categoriaService : CategoriaService
    , public despesaService: DespesaService) {

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

    if(this.itemEdicao) 
    {    
      this.itemEdicao.nome = dados["name"].value;
      this.itemEdicao.idSistema = parseInt(this.sistemaSelect.id);
      this.itemEdicao.nomePropriedade = "";
      this.itemEdicao.mensagem = "";
      this.itemEdicao.notificacoes = [];
  
      this.categoriaService.AtualizarCategoria(this.itemEdicao)
      .subscribe((response: Categoria) => {
    
        this.categoriaForm.reset();
  
        this.ListaCategoriasUsuario();
      }, (error) => console.error(error),
        () => { })
    }
    else
    {
      let item = new Categoria();
    
      item.nome = dados["name"].value;
      item.id = 0
      item.idSistema = parseInt(this.sistemaSelect.id);
  
      this.categoriaService.AdicionarCategoria(item)
      .subscribe((response: Categoria) => {
    
        this.categoriaForm.reset();
  
        this.ListaCategoriasUsuario();
      }, (error) => console.error(error),
        () => { })
    }
  }

  ListarSistemasUsuario(id: number = null) {

    this.sistemaService.ListaSistemasUsuario(this.authService.getEmailUser())
      .subscribe((response : Array<SistemaFinanceiro>) => {
        debugger
        var listaSistemafinanceiro = [];

        response.forEach(x => {
          var item = new SelectModel();
          item.id = x.id.toString().toLowerCase();
          item.nome = x.nome.toLowerCase();
          listaSistemafinanceiro.push(item);

          if (id && id == x.id) {
            this.sistemaSelect = item;
          }
        });

        this.listSistemas = listaSistemafinanceiro;
        } 
      )
  }

  itemEdicao: Categoria;
  edicao(id: number) {
    this.categoriaService.ObterCategoria(id)
      .subscribe((response: Categoria) => {
          if(response) 
          {
            debugger
            this.itemEdicao = response;
            this.tipoTela = 2;

            var dados = this.dadosForm();
            dados["name"].setValue(this.itemEdicao.nome);
            this.ListarSistemasUsuario(response.idSistema);
          }
        },
      (error) => console.error(error),
    () => {
    })
  }

  deletar(id:number)
  {
    debugger
    var despesasPorCategoria = this.despesaService.ListarDespesasPorCategoria(id);

    despesasPorCategoria.forEach(x => 
      {
        this.despesaService.DeletarDespesa(x.id);
      } 
    );


    this.categoriaService.DeletarCategoria(id)
      .subscribe((response: any) => {
        this.ListaCategoriasUsuario();
      },
      (error) => console.log(error), () => {} 
      )
  }
}
