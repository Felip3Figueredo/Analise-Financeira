import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaFinanceiro } from '../../models/SistemaFinanceiro';
import { SistemaService } from '../../services/sistema.service';
import { AuthService } from '../../services/auth.service';
import { UsuarioSistemaFinanceiro } from '../../services/usuario-sistema.service';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrl: './sistema.component.scss'
})
export class SistemaComponent {
  //1 Listagem. 2 Cadastro. 3 Edição.
  tipoTela: number = 1; 
  tableListSistemas: Array<SistemaFinanceiro>;

  id: string;
  page : number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;

  id2: string;
  page2 : number = 1;
  config2: any;
  paginacao2: boolean = true;
  itemsPorPagina2: number = 10;
  tableListUsuariosistema: Array<any>;

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina
    };

    this.id2 = this.gerarIdParaConfigDePaginacao();

    this.config2 = {
      id: this.id2,
      currentPage: this.page2,
      itemsPerPage: this.itemsPorPagina2
    };
  }

  cadastro()
  {
    debugger
    this.itemEdicao = null;
    this.tipoTela = 2;
    this.sistemaForm.reset();
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

  mudarItemsPorPage2() {
    this.page = 1;
    this.config.currentPage = this.page2;
    this.config.itemsPerPage = this.itemsPorPagina2;
  }

  mudarPage2(event: any) {
    this.page = event;
    this.config.currentPage = this.page2;
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

  ListaSistemasFinanceiro()
  {
    debugger
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.sistemaService.ListaSistemasUsuario(this.authService.getEmailUser())
    .subscribe((response: Array<SistemaFinanceiro>) => {
      this.tableListSistemas = response;
      
    }, (error) => console.error(error),
      () => { })
  }

  constructor (public menuService: MenuService, public formBuilder: FormBuilder, public sistemaService: SistemaService, public authService: AuthService, public usuarioSistemaFinanceiro: UsuarioSistemaFinanceiro) {
  }

  sistemaForm:FormGroup;
  checked=false
  gerarCopiaDespesa = 'accent';
  disabled = false;

  ngOnInit() {
    this.menuService.menuSelecionado = 2
    this.configpag();
    this.ListaSistemasFinanceiro();

    this.sistemaForm = this.formBuilder.group
    (
      {
        name:['', [Validators.required]],
        mes: ['', [Validators.required]],
        ano: ['', [Validators.required]],
        diaFechamento: ['', [Validators.required]],
        mesCopia: ['', [Validators.required]],
        anoCopia: ['', [Validators.required]]
      }
    )
  }

  dadosForm() 
  {
    return this.sistemaForm.controls;
  }

  enviar() 
  {
    debugger

    var dados = this.dadosForm();

    if (this.itemEdicao) {

      this.itemEdicao.nome = dados["name"].value;
      this.itemEdicao.mes = dados["mes"].value;
      this.itemEdicao.ano = dados["ano"].value;
      this.itemEdicao.diaFechamento = dados["diaFechamento"].value;
      this.itemEdicao.gerarCopiaDespesa = this.checked;
      this.itemEdicao.mesCopia = dados["mesCopia"].value;
      this.itemEdicao.anoCopia = dados["anoCopia"].value;

      this.itemEdicao.nomePropriedade = "";
      this.itemEdicao.mensagem = "";
      this.itemEdicao.notificacoes = [];

      this.sistemaService.AtualizarSistemaFinanceiro(this.itemEdicao)
      .subscribe((response: SistemaFinanceiro) => {
    
        this.sistemaForm.reset();
        this.ListaSistemasFinanceiro();

      }, (error) => console.error(error),
        () => { })
    }
    else
    {
      let item = new SistemaFinanceiro();
    
      item.nome = dados["name"].value;
      item.id = 0;
      item.mes = dados["mes"].value;
      item.ano = dados["ano"].value;
      item.diaFechamento = dados["diaFechamento"].value;
      item.gerarCopiaDespesa = this.checked;
      item.mesCopia = dados["mesCopia"].value;
      item.anoCopia = dados["anoCopia"].value;



      this.sistemaService.AdicionarSistemaFinanceiro(item)
      .subscribe((response: SistemaFinanceiro) => {
    
        this.sistemaForm.reset();
        
        this.sistemaService.CadastrarUsuarioNoSistema(response.id, this.authService.getEmailUser())
        .subscribe((response: any) => {
          this.ListaSistemasFinanceiro();
        }, (error) => console.error(error),
          () => { })

      }, (error) => console.error(error),
        () => { })
    }
    
  }


  itemEdicao: SistemaFinanceiro;
  edicao(id: number) {
    debugger
    this.sistemaService.ObterSistemaFinanceiro(id)
      .subscribe((response: SistemaFinanceiro) => {
        if(response) 
        {
          this.itemEdicao = response;
          this.tipoTela = 2;

          var dados = this.dadosForm();
          dados["name"].setValue(this.itemEdicao.nome);
          dados["mes"].setValue(this.itemEdicao.mes);
          dados["ano"].setValue(this.itemEdicao.ano);
          dados["diaFechamento"].setValue(this.itemEdicao.diaFechamento);
          dados["mesCopia"].setValue(this.itemEdicao.mesCopia);
          dados["anoCopia"].setValue(this.itemEdicao.anoCopia);

          this.ListarUsuariosSistema();

          this.checked = this.itemEdicao.gerarCopiaDespesa;
        }
      },
    (error) => console.error(error),
  () => {
  })
  }

  handleChangePago(item:any) {
    this.checked = item.checked as boolean;
  }


  emailUsuarioSistema: string = "";
  emailUsuarioSistemaValid: boolean = true;
  textValid: string = "Campo Obrigatório";

  ListarUsuariosSistema()
  {
    this.usuarioSistemaFinanceiro.ListarUsuariosSistema(this.itemEdicao.id)
      .subscribe((response : Array<any>) => {
        debugger
        this.tableListUsuariosistema = response
      })
  }

  excluir(id: number) 
  {
    debugger
    this.usuarioSistemaFinanceiro.DeletarUsuarioNoSistema(id)
    .subscribe((response: SistemaFinanceiro) => {
      if (response) {
        debugger
        this.edicao(this.itemEdicao.id);
        this.emailUsuarioSistema = "";
      }
    },
    (error) => console.error(error),
    () => {})
  }

  addUsuarioSistema() {
    this.emailUsuarioSistemaValid = true;

    if (!this.emailUsuarioSistema) {
      this.emailUsuarioSistemaValid = true;
    }
    else {
      this.sistemaService.CadastrarUsuarioNoSistema(this.itemEdicao.id, this.emailUsuarioSistema)
        .subscribe((response: any) => {
          if(response) {
            this.edicao(this.itemEdicao.id);
            this.emailUsuarioSistema = "";
          }
        },
       (error) => console.error(error), () => {})
    }
  }
}