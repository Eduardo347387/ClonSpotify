import { EventEmitter, Injectable } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  callback: EventEmitter<any> = new EventEmitter<any>()
  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused');
  
  public audio!: HTMLAudioElement;

  constructor() { 
    this.audio = new Audio()

    this.trackInfo$.subscribe({
      next: responseOk => {
        if (responseOk) {
          this.setAudio(responseOk)
          console.log(responseOk)
        }
      },
      error: e=>{
        console.log(e)
      }
    })

    this.listenAllEvents()
  }

  private listenAllEvents(): void{
    this.audio.addEventListener('timeupdate', this.calcularTime, false)
    this.audio.addEventListener('playing', this.setPlayerStatus, false)
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('end', this.setPlayerStatus, false)
  }

  private setPlayerStatus = () => {
    
  }

  private calcularTime = ():void =>{
    const { duration, currentTime } = this.audio
    this.setTimeElapsed(currentTime)
    this.setRemainig(currentTime,duration)
    console.table([duration, currentTime])
    
  }


  private setTimeElapsed(currentTime:number):void {
    let seconds = Math.floor(currentTime % 60)
    let minutes = Math.floor((currentTime / 60) % 60)

    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes
    const displayFormat = `${displayMinutes}:${displaySeconds}`
    this.timeElapsed$.next(displayFormat)
  }

  private setRemainig(currentTime: number, duration: number): void{
    let timeLeft = duration - currentTime
    let seconds = Math.floor(timeLeft % 60)
    let minutes = Math.floor((timeLeft / 60) % 60) 
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat)
  }

  public setAudio(track: TracksModel): void {
    this.audio.src = track.url
    console.log( this.audio.src)
    this.audio.play() 
 
  } 


}
