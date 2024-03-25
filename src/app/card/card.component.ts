import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  constructor(private http: DataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap.get('name'));
  }
}
