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
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0);
  public positionTrack$: BehaviorSubject<any> = new BehaviorSubject(0);
  public audio!: HTMLAudioElement;
 

  constructor() { 
    this.audio = new Audio()

    this.trackInfo$.subscribe({
      next: responseOk => {
        if (responseOk) {
          this.setAudio(responseOk)
          this.positionTrack$.next(responseOk._id)
        }
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

  private setPlayerStatus = (state:any) => {
    switch (state.type) {
      case 'play':
        this.playerStatus$.next('play');
        break;
      case 'playing':
        this.playerStatus$.next('playing');
        break;
      case 'ended':
        this.playerStatus$.next('ended');
        break;
      default:
        this.playerStatus$.next('paused');
    }
  }

  public togglePlayer(): void{
    (this.audio.paused) ? this.audio.play() : this.audio.pause()
  }

  public seekAudio(percentage: number): void{
    const { duration } = this.audio
    const percentageToSecond = (percentage * duration) / 100
    this.audio.currentTime = percentageToSecond
  }

  private setPercentage(currentTime: number, duration: number): void{
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage);
  }

  private calcularTime = ():void =>{
    const { duration, currentTime } = this.audio
    this.setTimeElapsed(currentTime)
    this.setRemainig(currentTime, duration)
    this.setPercentage(currentTime,duration)
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
    this.audio.play() 
 
  } 


}
