import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Level } from "../service/level";
import { User } from "../service/user";
import { Headers, Http } from '@angular/http';

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
	    	.then(response => { return response.json() as User[]; })
	    	.catch(this.handleError);
	}

	/**
	 * Pour récupérer tous les level de la table level
	 * @return {Promise<Level[]>} [description]
	 */
	getAllLevel(): Promise<Level[]>{
		const url = `${this.api}/listlevel`;

		return this.http.get(url)
			.toPromise()
			.then(response => { return response.json() as Level[]; })
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
	 * Pour mettre à jour un utilisateur
	 * @param  {User}          user [description]
	 * @return {Promise<User>}      [description]
	 */
	update(user: User): Promise<User>{
		return this.http.put(`${this.api}/userupdate/${user.id_user}`, JSON.stringify(user), {headers: this.headers})
			.toPromise()
			.then(response => response.json() as User)
			.catch(this.handleError);
	}

	/**
	 * Pour insérer les utilisateur dans la table user
	 * @param  {User}          user [description]
	 * @return {Promise<User>}      [description]
	 */
	add(user: User): Promise<User>{
		const url = `${this.api}/api/adduser`;
		return this.http.post(url, JSON.stringify(user), {headers : this.headers})
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
