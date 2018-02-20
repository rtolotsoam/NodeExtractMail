import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Level } from '../service/level';
import { LevelService } from '../service/level.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acces',
  templateUrl: './acces.component.html',
  styleUrls: ['./acces.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccesComponent implements OnInit {

	level : Level[];

	loadingIndicator: boolean = true;
  	reorderable: boolean = true;

  	constructor(  		
  		private router : Router, 
  		private levelService : LevelService
  	) { }

  	ngOnInit() {
  		this.getAllLevel();
  	}

  	getAllLevel(): void{
  		this.levelService.getAllLevel()
  		.then(level => {
            this.level = level['data'];
  		});
  	}

  	rattachLien(id: string): void {
      	this.router.navigate(['/addacces', id]);
    }

    detailAcces(id: string): void {
    	this.router.navigate(['/accesdetail', id]);
    }

}
