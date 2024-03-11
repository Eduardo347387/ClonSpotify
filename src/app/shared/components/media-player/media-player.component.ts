import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { TracksModule } from '@modules/tracks/tracks.module';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit, OnDestroy{
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  public _multimediaService = inject(MultimediaService);
  listObservers$: Array<Subscription> = []
  state: string = 'paused';
  ngOnInit(): void {
    const observer1$ = this._multimediaService.playerStatus$
      .subscribe({
        next: status => {
          this.state = status
        }
      })
    this.listObservers$ = [observer1$]
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe());
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
