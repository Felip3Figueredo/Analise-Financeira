import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";
import { Categoria } from "../models/Categoria";

@Injectable({
    providedIn: 'root'
})


export class CategoriaService {
    
    constructor(private httpClient: HttpClient) 
    {
    }

    private readonly baseURL = environment["endPoint"]

    AdicionarCategoria(categoria:Categoria)
    {
        return this.httpClient.post<Categoria>(`${this.baseURL}/AdicionarCategoria`, categoria)
    }

    ListarCategoriaUsuario(emailUsuario:string)
    {
        return this.httpClient.get(`${this.baseURL}/ListarCategoriaUsuario?emailUsuario=${emailUsuario}`)
    }

    ObterCategoria (id:number)
    {
        return this.httpClient.get(`${this.baseURL}/ObterCategoria?id=${id}`)
    }

    AtualizarCategoria (categoria: Categoria)
    {
        return this.httpClient.put<Categoria>(`${this.baseURL}/AtualizarCategoria`, categoria)
    }
}