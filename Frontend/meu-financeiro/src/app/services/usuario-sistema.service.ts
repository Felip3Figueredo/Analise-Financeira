import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { SistemaFinanceiro } from "../models/SistemaFinanceiro";

@Injectable({
    providedIn: 'root'
})

export class UsuarioSistemaFinanceiro
{
    constructor(private httpClient: HttpClient)
    {
    }

    private readonly baseUrl = environment["endPoint"];

    CadastrarUsuarioNoSistema(idSistema: number, emailUsuario: string)
    {
        return this.httpClient.post<UsuarioSistemaFinanceiro>(`${this.baseUrl}/CadastrarUsuarioNoSistema?idSistema=${idSistema}&emailUsuario=${emailUsuario}`, null)
    }

    ListarUsuariosSistema(idSistema:number)
    {
        return this.httpClient.get(`${this.baseUrl}/ListarUsuariosSistema?idSistema=${idSistema}`);
    }

    DeletarUsuarioNoSistema(id: number)
    {
        return this.httpClient.delete(`${this.baseUrl}/DeletarUsuarioNoSistema?id=${id}`);
    }
}

