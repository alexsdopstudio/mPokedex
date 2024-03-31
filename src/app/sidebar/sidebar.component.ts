import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Paginated, Results } from '../types/paginatedResponse';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  types: Results[] = [];
  habitats: Results[] = [];
  isOpen = true;

  constructor(private data: DataService, private route: Router) {}

  ngOnInit(): void {
    this.getTypes();
    this.getHabitats();
  }

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }

  getTypes(): void {
    this.data.getData<Paginated>('type').subscribe((response) => {
      this.types = response.results;
    });
  }

  getHabitats(): void {
    this.data.getData<Paginated>('pokemon-habitat').subscribe((response) => {
      this.habitats = response.results;
    });
  }

  search(value: string): void {
    if(value){
      this.route.navigate(['/card', value]);
    }
  }

  onFilterChange(e: Event, ep: string): void {
    const target = e.target as HTMLButtonElement;
    this.data.fetchData(ep, target.innerText);
  }
}
