import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Client } from "../service/client";
import { Headers, Http, RequestOptions } from '@angular/http';


@Injectable()
export class ClientService {

	private host    = window.location.hostname;
	private token;
	private headers = new Headers({'Content-Type': 'application/json'});
	private headers_token = new Headers();
	private api     = `http://${this.host}:3000/api`;
	private options = new RequestOptions();

  	constructor(private http: Http) { }

  	/**
  	 * Pour prendre tous les mail client
  	 * @return {Promise<Client[]>} [description]
  	 */
  	getAllmail(): Promise<Client[]> {
  		
  		const url = `${this.api}/mailclient`;

  		this.token = JSON.parse(localStorage.getItem('currentUser'));

  		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

	    return this.http.get(url, this.options)
	    	.toPromise()
	    	.then(response => { return response.json() as Client[]; })
	    	.catch(this.handleError);
	}


	/**
	 * Pour détail d'une mail client
	 * @param  {string}          id_mailclient [description]
	 * @return {Promise<Client>}               [description]
	 */
	getMail(id_mailclient: string) : Promise<Client>{
		const url = `${this.api}/mailclient/${id_mailclient}`;

		this.token = JSON.parse(localStorage.getItem('currentUser'));

		console.log(this.token);

		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

	    return this.http.get(url, this.options)
	    	.toPromise()
	    	.then(response => response.json() as Client)
	    	.catch(this.handleError);
	}


	/**
	 * Pour mettre à jour les mails
	 * @param  {Client}          client [description]
	 * @return {Promise<Client>}        [description]
	 */
	updateMail(client: Client): Promise<Client>{

		this.token = JSON.parse(localStorage.getItem('currentUser'));

		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

		return this.http.put(`${this.api}/clientupdate/${client.id_mailclient}`, JSON.stringify(client), { headers: this.headers_token })
			.toPromise()
			.then(response => response.json() as Client)
			.catch(this.handleError);
	}

	/**
	 * Pour ajouter nouvel mail client
	 * @param  {Client}          client [description]
	 * @return {Promise<Client>}        [description]
	 */
	addMail(client: Client): Promise<Client>{
		
		const url = `${this.api}/mailinsert`;

		this.token = JSON.parse(localStorage.getItem('currentUser'));
		
		if(this.token != null){

  			this.headers_token = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token.token, 'X-access-token' : this.token.token });
  		
  			this.options = new RequestOptions({ headers: this.headers_token });
  		}

		return this.http.post(url, JSON.stringify(client), {headers : this.headers_token})
			.toPromise()
			.then(response => response.json() as Client)
			.catch(this.handleError);
	}


	/**
	 * gestion erreur
	 * @param  {any}          error [description]
	 * @return {Promise<any>}       [description]
	 */
	private handleError(error: any): Promise<any> {
	    console.error('Une erreur est survenue : ', error); 
	    return Promise.reject(error.message || error);
	}



}
