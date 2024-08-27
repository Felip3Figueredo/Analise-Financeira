import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { Despesa } from "../models/Despesa";
import { Categoria } from "../models/Categoria";

@Injectable({
    providedIn: 'root'
})


export class DespesaService {
    
    constructor(private httpClient: HttpClient) 
    {
    }

    private readonly baseURL = environment["endPoint"]

    AdicionarDespesa(despesa:Despesa)
    {
        return this.httpClient.post<Despesa>(`${this.baseURL}/AdicionarDespesa`, despesa)
    }

    ListarDespesaUsuario(emailUsuario:string)
    {
        return this.httpClient.get(`${this.baseURL}/ListarDespesasUsuario?emailUsuario=${emailUsuario}`)
    }

    ObterDespesa (id:number)
    {
        return this.httpClient.get(`${this.baseURL}/ObterDespesa?id=${id}`)
    }

    AtualizarDespesa (despesa: Despesa)
    {
        return this.httpClient.put<Despesa>(`${this.baseURL}/AtualizarDespesa`, despesa)
    }

    CarregaGraficos(emailUsuario: string)
    {
        return this.httpClient.get(`${this.baseURL}/CarregarGraficos?emailUsuario=${emailUsuario}`)
    }

    DeletarDespesa(id: number)
    {
        return this.httpClient.delete<Despesa>(`${this.baseURL}/DeletarDespesa?id=${id}`)
    }

    ListarDespesasPorCategoria(id: number)
    {
        return this.httpClient.get<Categoria>(`${this.baseURL}/ListarDespesasPorCategoria?id=${id}`)
    }
    
}