import { Component, Input, OnInit } from '@angular/core';

import { TracksModel } from '@core/models/tracks.model';
import { OrderListPipe } from '../../pipes/order-list.pipe';
@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.scss']
})
export class PlayListBodyComponent implements OnInit{
  @Input() tracks: TracksModel[] = []

  optionSort:{
    property: string | null,
    order:string
  } = {
    property: null,
    order: 'asc'
  }
  
  ngOnInit(): void {
  
  }

  changeSort(property:string):void{
    const { order } = this.optionSort
    this.optionSort = {
      property,
      order:order === 'asc'? 'desc': 'asc'
    }
  }

}
