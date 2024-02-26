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
    Order:string
  } = {
    property: null,
    Order: 'asc'
  }
  
  ngOnInit(): void {
    const { data }: any = (dataRaw as any).default
    this.tracks = data;
  }

  changeSort(property:string):void{
      
  }

}
