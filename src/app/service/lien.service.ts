import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Lien } from "../service/lien";
import { Headers, Http, RequestOptions } from '@angular/http';

@Injectable()
export class LienService {

	private host          = window.location.hostname;
	private token;
	private headers       = new Headers({'Content-Type': 'application/json'});
	private headers_token = new Headers();
	private api           = `http://${this.host}:3000/api`;
	private options       = new RequestOptions();

  	constructor(private http: Http) { }

  	/**
  	 * Pour récupérer tous les liens
  	 * @return {Promise<Lien[]>} [description]
  	 */
  	getAllLien(): Promise<Lien[]> {
  		const url = `${this.api}/listlien`;

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
	 * Pour récupérer un lien
	 * @param  {string}        id_lien [description]
	 * @return {Promise<Lien>}         [description]
	 */
	getLien(id_lien: string) : Promise<Lien>{
		const url = `${this.api}/lien/${id_lien}`;

		this.token = JSON.parse(localStorage.getItem('currentUser'));

		//console.log(this.token);

		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

	    return this.http.get(url, this.options)
	    	.toPromise()
	    	.then(response => response.json() as Lien)
	    	.catch(this.handleError);
	}


	/**
	 * Pour mettre à jour un lien
	 * @param  {Lien}          lien [description]
	 * @return {Promise<Lien>}      [description]
	 */
	updateLien(lien: Lien): Promise<Lien>{

		this.token = JSON.parse(localStorage.getItem('currentUser'));

		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

		return this.http.put(`${this.api}/lienupdate/${lien.id_lien}`, JSON.stringify(lien), { headers: this.headers_token })
			.toPromise()
			.then(response => response.json() as Lien)
			.catch(this.handleError);
	}


	/**
	 * Pour ajouter un lien
	 * @param  {Lien}          lien [description]
	 * @return {Promise<Lien>}      [description]
	 */
	addLien(lien: Lien): Promise<Lien>{
		const url = `${this.api}/addlien`;

		this.token = JSON.parse(localStorage.getItem('currentUser'));
		
		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

		return this.http.post(url, JSON.stringify(lien), {headers : this.headers_token})
			.toPromise()
			.then(response => response.json() as Lien)
			.catch(this.handleError);
	}

	/**
	 * Pour supprimer un lien
	 * @param  {number}        id_lien [description]
	 * @return {Promise<Lien>}         [description]
	 */
	deleteLien(id_lien: number): Promise<Lien> {
		const url = `${this.api}/deletelien`;

		this.token = JSON.parse(localStorage.getItem('currentUser'));
		
		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

		return this.http.post(url, JSON.stringify({ id_lien: id_lien }), { headers : this.headers_token })
		.toPromise()
		.then(response => response.json() as Lien)
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
