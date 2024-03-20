import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';

import { TracksModel } from '@core/models/tracks.model';
import { OrderListPipe } from '../../pipes/order-list.pipe';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.scss']
})
  
export class PlayListBodyComponent implements OnInit, OnDestroy{
  @Input() tracks: TracksModel[] = []
  public _multimediaService = inject(MultimediaService)
  private listObservable$: Array<Subscription> = [];

  idTrack: number = 0
  
  optionSort:{
    property: string | null,
    order:string
  } = {
    property: null,
    order: 'asc'
  }
  

  ngOnInit(): void {
    const observer1$ = this._multimediaService.trackInfo$
      .subscribe({
        next: track => {
          if (track) {
            this.idTrack = track._id
          }

      }
    })
    this.listObservable$ = [observer1$]

  }
  
  ngOnDestroy(): void {
      this.listObservable$.forEach(u=>u.unsubscribe())
  }

  sedPlay(track: TracksModel | undefined): void{
    this._multimediaService.trackInfo$.next(track)
  }

  changeSort(property:string):void{
    const { order } = this.optionSort
    this.optionSort = {
      property,
      order:order === 'asc'? 'desc': 'asc'
    }
  }

}
