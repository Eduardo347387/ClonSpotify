import { EventEmitter, Injectable } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>()
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public audio!: HTMLAudioElement;

  constructor() { 
    this.audio = new Audio()

    this.trackInfo$.subscribe({
      next: responseOk => {
        if (responseOk) {
          this.setAudio(responseOk)
        }
      },
      error: e=>{
        console.log(e)
      }
    })
  }

  public setAudio(track: TracksModel): void {
    this.audio.src = track.url
    console.log(track.url)
    this.audio.play() 
 
  } 


}
