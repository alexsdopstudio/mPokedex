import { Component } from '@angular/core';
//if standalone
//import { SidebarComponent } from './sidebar/sidebar.component'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mPokedex';
}