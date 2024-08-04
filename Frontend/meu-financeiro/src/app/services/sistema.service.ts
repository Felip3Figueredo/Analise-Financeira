import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { SistemaFinanceiro } from "../models/SistemaFinanceiro";

@Injectable({
    providedIn: 'root'
})

export class SistemaService 
{
    constructor(private httpClient: HttpClient) 
    {
    }

    private readonly baseURL = environment["endPoint"]

    AdicionarSistemaFinanceiro(sistemaFinanceiro: SistemaFinanceiro)
    {
        return this.httpClient.post<SistemaFinanceiro>(`${this.baseURL}/AdicionarSistemaFinanceiro`, sistemaFinanceiro)
    }

    ListaSistemasUsuario(emailUsuario:string)
    {
        return this.httpClient.get(`${this.baseURL}/ListaSistemasUsuario?emailUsuario=${emailUsuario}`)
    }

    CadatraUsuarioNoSistema(idSistema:number, emailUsuario:string)
    {
        return this.httpClient.post<any>(`${this.baseURL}/CadatraUsuarioNoSistema?IdSistema=${idSistema}&emailUsuario=${emailUsuario}`, null)
    }
}