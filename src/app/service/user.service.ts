import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {User} from "../service/user";
import {Headers, Http} from '@angular/http';

@Injectable()
export class UserService {

	private host    = window.location.hostname;
	private headers = new Headers({'Content-Type': 'application/json'});
	private api     = `http://${this.host}:3000/api`;

  	constructor(private http: Http) { };

  	/**
  	 * Pour récupérer tous les utilisateurs
  	 * @return {Promise<User[]>} [attente d'un tableau d'utilisateurs]
  	 */
  	getAllUsers(): Promise<User[]> {
  		const url = `${this.api}/listusers`;
	    return this.http.get(url)
	      .toPromise()
	      .then(response => {
	        return response.json() as User[];
	      })
	      .catch(this.handleError);
	}

	/**
	 * Pour récupérer un utilisateur avec son ID
	 * @param  {number}        id [id_user]
	 * @return {Promise<User>}    [attente d'un utilisateur]
	 */
	getUser(id_user: string) : Promise<User>{
		const url = `${this.api}/user/${id_user}`;
	    return this.http.get(url)
	      .toPromise()
	      .then(response => response.json() as User)
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
