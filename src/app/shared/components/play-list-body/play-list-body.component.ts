import { Component, Input, OnInit, inject } from '@angular/core';

import { TracksModel } from '@core/models/tracks.model';
import { OrderListPipe } from '../../pipes/order-list.pipe';
import { MultimediaService } from '@shared/services/multimedia.service';
@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.scss']
})
export class PlayListBodyComponent implements OnInit{
  @Input() tracks: TracksModel[] = []
  private _multimediaService = inject(MultimediaService)
  
  optionSort:{
    property: string | null,
    order:string
  } = {
    property: null,
    order: 'asc'
  }
  
  ngOnInit(): void {
  
  }

  sedPlay(track: TracksModel | undefined): void{
    this._multimediaService.trackInfo$.next(track)
    this._multimediaService.positionTrack$.next(track?._id)
  }

  changeSort(property:string):void{
    const { order } = this.optionSort
    this.optionSort = {
      property,
      order:order === 'asc'? 'desc': 'asc'
    }
  }

}
