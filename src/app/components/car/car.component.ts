import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetail/carDetail';
import { CarService } from 'src/app/services/car/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})

export class CarComponent implements OnInit {
   carDetail: CarDetail | undefined;
   carDetails: CarDetail[] = [];
   car:Car[]=[];
   filterText="";
   dataLoaded=false;
   colorFilter="";

   constructor(
      private carService: CarService, 
      private activatedRoute: ActivatedRoute) {
   }

   ngOnInit(): void {
      this.activatedRoute.queryParams.subscribe((params) => {    
       if (params['colorId'] && params['brandId']) {
         this.getCurrentBrandAndColorId( params['brandId'],params['colorId']);
       } else if (params['colorId']) {
         this.getCarsByColorId(params['colorId']);
       } else if (params['brandId']) {
         this.getCarsByBrandId(params['brandId']);
       } else {
         this.getCars();
       }
     });

   }

   getCarsByBrandAndColorId(brandId: number,colorId: number){
      this.carService.getCarsByBrandAndColorId(brandId,colorId).subscribe((response)=>{
         this.carDetails=response.data;
         this.dataLoaded=true;
      })
   }

getCurrentBrandAndColorId(brandId:number,colorId:number){
   this.carService.getCarsByBrandAndColorId(brandId,colorId).subscribe((response)=>{
     this.carDetails=response.data;
     this.dataLoaded=true;
     console.log("başlName. colorId:",colorId," brandId:",brandId);
     console.log(response.data);
   })
 }

   getCars() {
      this.carService.getCars().subscribe((response) => {
         this.carDetails = response.data;
         this.dataLoaded=true;
      });
   }

   getCarsByBrandId(brandId: number) {
      this.carService.getCarsByBrandId(brandId).subscribe((response) => {
         this.carDetails = response.data;
         this.dataLoaded=true;
      });
   }

   getCarsByColorId(colorId: number) {
      this.carService.getCarsByColorId(colorId).subscribe((response) => {
         this.carDetails = response.data;
         this.dataLoaded=true;
      });
   }
}
