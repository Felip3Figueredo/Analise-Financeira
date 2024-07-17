import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environment";

@Injectable({
    providedIn: 'root'
})

export class MenuService 
{
    constructor (private httpClient:HttpClient)
    {

    }

    menuSelecionado:number;
}