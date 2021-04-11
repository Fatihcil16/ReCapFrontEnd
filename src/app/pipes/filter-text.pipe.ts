import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail/carDetail';

@Pipe({
  name: 'filterPipe'
})
export class FilterTextPipe implements PipeTransform {

  transform(value: CarDetail[], filterText: string): CarDetail[] {

    filterText=filterText?filterText.toLocaleLowerCase():""
    return filterText?value
    .filter((p:CarDetail)=>p.description
    .toLocaleLowerCase().indexOf(filterText)!==-1)
    :value;
  }
  }

