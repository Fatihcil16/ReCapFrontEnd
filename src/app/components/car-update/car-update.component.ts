import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand/brand';
import { Car } from 'src/app/models/car/car';
import { CarDetail } from 'src/app/models/carDetail/carDetail';
import { Color } from 'src/app/models/color/color';
import { BrandService } from 'src/app/services/brand/brand.service';
import { CarService } from 'src/app/services/car/car.service';
import { ColorService } from 'src/app/services/color/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css'],
})
export class CarUpdateComponent implements OnInit {
  car: Car;
  carUpdateForm: FormGroup;
  colors: Color[];
  brands: Brand[];
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private brandService: BrandService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.getCarById(param['carId']);
   
    });
  }

  getCarById(carId: number) {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
      this.getBrands();
      this.getColors();
      this.createCarUpdateForm();
    });
  }

  createCarUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      carId: [this.car.carId, Validators.required],
      brandId: [this.car.brandId, Validators.required],
      colorId: [this.car.colorId, Validators.required],
      modelYear: [this.car.modelYear, Validators.required],
      dailyPrice: [this.car.dailyPrice, Validators.required],
      description: [this.car.description, Validators.required],
      carFindexPoint:[this.car.carFindexPoint],
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  carUpdate() {

    let car: Car = this.carUpdateForm.value;

    car.brandId = Number(car.brandId);
      car.colorId = Number(car.colorId);
      car.modelYear = Number(car.modelYear);
      car.dailyPrice = Number(car.dailyPrice);
      
    console.log(car);
    if (!this.carUpdateForm.valid) {
      return;
    }

    this.carService.updateCar(car).subscribe(
      (responseSuccess) => {
        return this.toastrService.success(responseSuccess.message, 'Success');
      },
      (responseError) => {
        console.log(responseError);
      }
    );
  }
}