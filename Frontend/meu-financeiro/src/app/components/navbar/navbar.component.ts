import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public formBuilder: FormBuilder, public authService: AuthService){
    
  }

  navbarForm:FormGroup

  dadosForm() 
  {
    return this.navbarForm.controls;
  }

  ngOnInit() {
    this.navbarForm = this.formBuilder.group
    (
      {
        nome:['', [Validators.required]],
      }
    )
    this.usuarioLogado();
  }

  usuarioLogado(){
    debugger
    var dados = this.dadosForm();
    var email = this.authService.getEmailUser();
    dados["nome"].setValue(email);
  }
}