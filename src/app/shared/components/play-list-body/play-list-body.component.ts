import { Component, OnInit } from '@angular/core';
import * as dataRaw from '../../../data/tracks.json'
import { TracksModel } from '@core/models/tracks.model';
import { OrderListPipe } from '../../pipes/order-list.pipe';
@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.scss']
})
export class PlayListBodyComponent implements OnInit{
  tracks: TracksModel[] = []

  optionSort:{
    property: string | null,
    order:string
  } = {
    property: null,
    order: 'asc'
  }
  
  ngOnInit(): void {
    const { data }: any = (dataRaw as any).default
    this.tracks = data;
  }

  changeSort(property:string):void{
    const { order } = this.optionSort
    this.optionSort = {
      property,
      order:order === 'asc'? 'desc': 'asc'
    }
  }

}
