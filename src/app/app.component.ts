import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Habitat } from './types/habitats';
import { Type } from './types/types';

//if standalone
//import { SidebarComponent } from './sidebar/sidebar.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'mPokedex';
  types:  Type[] = [];
  habitats: Habitat[] = [];

  getTypes(){
    this.data.getData('type').subscribe((data: any) =>{
      this.types = data.results
      console.log(this.types);
    })
  }

  getHabitats(){
    this.data.getData('pokemon-habitat').subscribe((data: any) =>{
      this.habitats = data.results
      console.log(this.habitats);
    })

  }

  ngOnInit(): void {
    console.log('oninit')
    this.getTypes();
    this.getHabitats();
  }

  constructor(private data: DataService){
  }


}
