import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Level } from "../service/level";
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()
export class LevelService {

	private host    = window.location.hostname;
	private token;
	private headers = new Headers({'Content-Type': 'application/json'});
	private headers_token = new Headers();
	private api     = `http://${this.host}:3000/api`;
	private options = new RequestOptions();

  	constructor(private http: Http) { }

  	/**
	 * Pour récupérer tous les level de la table level
	 * @return {Promise<Level[]>} [description]
	 */
	getAllLevel(): Promise<Level[]>{
		const url = `${this.api}/listlevel`;

		this.token = JSON.parse(localStorage.getItem('currentUser'));

		//console.log(this.token);

		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

		return this.http.get(url, this.options)
			.toPromise()
			.then(response => { return response.json() as Level[]; })
			.catch(this.handleError);
	}

	/**
	 * Pour récupérer un level
	 * @param  {string}         id_level [description]
	 * @return {Promise<Level>}          [description]
	 */
	getLevel(id_level: string) : Promise<Level>{
		const url = `${this.api}/level/${id_level}`;

		this.token = JSON.parse(localStorage.getItem('currentUser'));

		//console.log(this.token);

		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

	    return this.http.get(url, this.options)
	    	.toPromise()
	    	.then(response => response.json() as Level)
	    	.catch(this.handleError);
	}


	/**
	 * Pour ajouter un level
	 * @param  {Level}         level [description]
	 * @return {Promise<Level>}       [description]
	 */
	addLevel(level: Level): Promise<Level>{
		const url = `${this.api}/addlevel`;

		this.token = JSON.parse(localStorage.getItem('currentUser'));
		
		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

		return this.http.post(url, JSON.stringify(level), {headers : this.headers_token})
			.toPromise()
			.then(response => response.json() as Level)
			.catch(this.handleError);
	}

	/**
	 * Pour mettre à jour le level
	 * @param  {Level}          level [description]
	 * @return {Promise<Level>}        [description]
	 */
	updateLevel(level: Level): Promise<Level>{

		this.token = JSON.parse(localStorage.getItem('currentUser'));

		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

		return this.http.put(`${this.api}/levelupdate/${level.id_level}`, JSON.stringify(level), { headers: this.headers_token })
			.toPromise()
			.then(response => response.json() as Level)
			.catch(this.handleError);
	}

	/**
	 * Pour supprimer un level
	 * @param  {number}         id_level [description]
	 * @return {Promise<Level>}          [description]
	 */
	deleteLevel(id_level: number): Promise<Level> {
		const url = `${this.api}/deletelevel`;

		this.token = JSON.parse(localStorage.getItem('currentUser'));
		
		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

		return this.http.post(url, JSON.stringify({ id_level: id_level }), { headers : this.headers_token })
		.toPromise()
		.then(response => response.json() as Level)
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
