import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {  
    private herosUrl = 'api/heroes'; //URL to web api
    private headers = new Headers({'Content-type':'application/json'});
    
    constructor (private http: Http){};

    private handleError(error: any) :Promise<any>{
        console.error('An error occurred', error); //for demo purposes only
        return Promise.reject(error.message || error);
    }

    getHeroes(): Promise<Hero[]> {
        console.log('Loaded from mocked server');
        return this.http.get(this.herosUrl)
                .toPromise()
                .then(response =>response.json().data as Hero[])
                .catch(this.handleError);
    }

    getHero(id:number): Promise<Hero>{
        const url  = `${this.herosUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response=> response.json().data as Hero)
            .catch(this.handleError);
    }

    update(hero:Hero): Promise<Hero>{
        const url = `${this.herosUrl}/${hero.id}`;
        return this.http
                .put(url, JSON.stringify(hero),{headers:this.headers})
                .toPromise()
                .then(()=>hero)
                .catch(this.handleError);
    }
    create(name:string):Promise<Hero>{
        return this.http
            .post(this.herosUrl,JSON.stringify({name:name}),{headers:this.headers})
            .toPromise()
            .then(res=>res.json().data)
            .catch(this.handleError);
    }
    delete(id:number):Promise<void>{
        const url = `${this.herosUrl}/${id}`;
        return this.http.delete(url, {headers:this.headers})
            .toPromise()
            .then(()=>null)
            .catch(this.handleError);
    }  
}