import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand/brand';
import { BrandService } from 'src/app/services/brand/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {

 dataLoaded=false;
 filterText="";


title: string = 'Brands';
listAllBrandCss: string = "text-start list-group-item";
brands: Brand[] = [];
currentBrandId: number = 0;

constructor(private brandService: BrandService,   private _router: Router) {
}

ngOnInit(): void {
   this.getBrands();
}

getBrands() {
   this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded=true;
   });
}

setCurrentBrand(brandId: number) {
   this.currentBrandId = brandId;
   this.getFilter(brandId);
}

getCurrentBrandClass(brandId: number): string {
   if (this.currentBrandId == brandId) {
      return 'list-group-item list-group-item-action active';
   }

   return 'list-group-item list-group-item-action';
}

resetCurrentBrandId(){
   this.currentBrandId = 0
}
getFilter(brandId:number){
   this._router.navigate(['cars/'], {
     queryParams: {brandId: brandId },
   });
 }
}

