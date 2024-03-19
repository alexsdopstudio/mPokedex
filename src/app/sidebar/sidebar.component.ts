import { Component, Input } from '@angular/core';
import { Habitat } from '../types/habitats';
import { Type } from '../types/types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() types!: Type[];
  @Input() habitats!: Habitat[];

  isOpen = true;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
