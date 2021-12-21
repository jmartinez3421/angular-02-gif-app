import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../intefaces/gifs.interface';

@Injectable({
    providedIn: 'root'
})
export class GifsService{
    
    private _apiKey:string = 'nPrHcN4JejyrA7sgQpQ7D2So7x41LKPC';
    private _apiGiphy:string = 'https://api.giphy.com/v1/gifs/search';
    
    private _historial: string[] = [];
    private _resultado: Gif[] = [];

    get historial(){
        return [...this._historial];
    }

    get resultado(){
        return [...this._resultado];
    }

    constructor( private http: HttpClient ){

        if(localStorage.getItem('historial') !== null){
            this._historial = JSON.parse( localStorage.getItem('historial')! );
        }

        this._resultado = JSON.parse(localStorage.getItem('lastResult')!) || [];

    }

    buscarGifs(query: string){
        
        //Control del historial
        query = query.trim().toLowerCase();
        if(!this._historial.includes(query)){
            this._historial.unshift(query);            
            this._historial =this._historial.splice(0,10); 
            
            localStorage.setItem('historial', JSON.stringify(this._historial));
        }

        const params = new HttpParams()
            .set('api_key', this._apiKey)
            .set('limit', '10')
            .set('q', query);

        //Búsqueda en el API
        this.http.get<SearchGifsResponse>(`${this._apiGiphy}`,{params})
            .subscribe( (resp) => {
                this._resultado = resp.data;
                localStorage.setItem('lastResult', JSON.stringify(resp.data));
            } )
    }

    borrarHistorial(){
        this._historial = [];
        localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    borrarResultado(){
        this._resultado = [];
        localStorage.setItem('lastResult', JSON.stringify(this._resultado));
    }

}