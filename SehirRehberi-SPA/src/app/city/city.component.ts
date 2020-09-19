import { Component, OnInit } from '@angular/core';
import { City } from '../models/city';
import { CityService } from '../services/city.service';
import { CommonModule } from "@angular/common";
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
  providers: [CityService]
})
export class CityComponent implements OnInit {

  constructor(private cityService: CityService) { }
  cities: City[];
  ngOnInit(): void {
    this.cityService.getCities().subscribe(data => {
      this.cities = data;
    });
  }

}
