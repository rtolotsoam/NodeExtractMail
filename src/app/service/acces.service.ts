import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Acces } from "../service/acces";
import { Lien } from "../service/lien";
import { User } from "../service/user";
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()
export class AccesService {

	private host          = window.location.hostname;
	private token;
	private headers       = new Headers({'Content-Type': 'application/json'});
	private headers_token = new Headers();
	private api           = `http://${this.host}:3000/api`;
	private options       = new RequestOptions();

  	constructor(private http: Http) { }


  	/**
  	 * Pour récupérer les liens appartenant au level
  	 * @param  {string}          id_level [description]
  	 * @return {Promise<Lien[]>}          [description]
  	 */
  	getLienWithLevel(id_level: string): Promise<Lien[]> {
  		const url = `${this.api}/acceslienwithlevel/${id_level}`;

  		this.token = JSON.parse(localStorage.getItem('currentUser'));

  		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

	    return this.http.get(url, this.options)
	    	.toPromise()
	    	.then(response => { return response.json() as Lien[]; })
	    	.catch(this.handleError);
	}

	/**
	 * Pour récupérer les utilisateurs appartenant au level
	 * @param  {string}          id_level [description]
	 * @return {Promise<User[]>}          [description]
	 */
	getUserWithLevel(id_level: string): Promise<User[]> {
  		const url = `${this.api}/acceslienuserwithlevel/${id_level}`;

  		this.token = JSON.parse(localStorage.getItem('currentUser'));

  		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

	    return this.http.get(url, this.options)
	    	.toPromise()
	    	.then(response => { return response.json() as User[]; })
	    	.catch(this.handleError);
	}

  	/**
  	 * Pour l'ajout acces
  	 * @param  {Acces}          acces [description]
  	 * @return {Promise<Acces>}       [description]
  	 */
  	addAcces(acces: Acces): Promise<Acces>{
		const url = `${this.api}/addacces`;

		this.token = JSON.parse(localStorage.getItem('currentUser'));
		
		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

		return this.http.post(url, JSON.stringify(acces), {headers : this.headers_token})
			.toPromise()
			.then(response => response.json() as Acces)
			.catch(this.handleError);
	}

	/**
	 * Pour la suppression d'accès
	 * @param  {string}         level_id [description]
	 * @param  {string}         lien_id  [description]
	 * @return {Promise<Acces>}          [description]
	 */
	deleteAcces(level_id: number, lien_id: number): Promise<Acces> {
		const url = `${this.api}/deleteacces`;

		this.token = JSON.parse(localStorage.getItem('currentUser'));
		
		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

		return this.http.post(url, JSON.stringify({ level_id: level_id, lien_id: lien_id }), { headers : this.headers_token })
		.toPromise()
		.then(response => response.json() as Acces)
		.catch(this.handleError);
	}

  	/**
	 * Ecoute des erreurs lors du requete Http
	 * @param  {any}          error [tous les erreurs]
	 * @return {Promise<any>}       [attente de tous ls erreurs]
	 */
  	private handleError(error: any): Promise<any> {
	    console.error('Une erreur est survenue : ', error); 
	    return Promise.reject(error.message || error);
	}

}
