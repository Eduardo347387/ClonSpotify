import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { TracksService } from '@modules/tracks/services/tracks.service';
import { TracksModule } from '@modules/tracks/tracks.module';
import { TruncateTextPipe } from '@shared/pipes/truncate-text.pipe';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription} from 'rxjs';

@Component({

  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],

})
export class MediaPlayerComponent implements OnInit, OnDestroy{
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  public _multimediaService = inject(MultimediaService);
  private _tracksService = inject(TracksService);

  listTracks: TracksModule[] = []
  listObservers$: Array<Subscription> = [];
  state: string = 'paused';
  index: number = 0;


  ngOnInit(): void {

    const observer1$ = this._multimediaService.playerStatus$
      .subscribe({
        next: status => {
          this.state = status
        
        }
      })
    
    const observer2$ = this._tracksService.getAllTracks$()
      .subscribe({
        next: tracks => {
          this.listTracks = tracks;
        }
      })
    
    const observer3$ = this._multimediaService.positionTrack$
      .subscribe({
        next: i => {
          this.index = i;
        }
      })
    
    this.listObservers$ = [observer1$,observer2$,observer3$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe());
  }

  trackNexT() {
    if (this.listTracks[this.index]) {
      this.index++;
      this._multimediaService.trackInfo$.next(this.listTracks[this.index - 1])
    } else {
      this.index = 0
    }
  
  }

  tracksPrevious() {
    if (this.listTracks[this.index-1]) {
      this.index--
      this._multimediaService.trackInfo$.next(this.listTracks[this.index - 1])
    }
  }

  
  handlePosition(event: MouseEvent): void{
    const elNative: HTMLElement = this.progressBar.nativeElement;
    const { clientX } = event
    const {x,width} = elNative.getBoundingClientRect()
    const clickX = clientX - x;
    const percentageFromX = (clickX * 100) / width
    this._multimediaService.seekAudio(percentageFromX)
  }

  

}
