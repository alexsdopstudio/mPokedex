import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Paginated, Results } from '../types/paginatedResponse';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  types: Results[] = [];
  habitats: Results[] = [];
  isOpen = true;

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  getTypes(): void {
    this.data.getData<Paginated>('type').subscribe((response) => {
      this.types = response.results;
      //console.log(this.types);
    });
  }

  getHabitats(): void {
    this.data.getData<Paginated>('pokemon-habitat').subscribe((response) => {
      this.habitats = response.results;
      //console.log(this.habitats);
    });
  }

  ngOnInit(): void {
    //console.log('oninit');
    this.getTypes();
    this.getHabitats();
  }

  constructor(private data: DataService) {}
}
