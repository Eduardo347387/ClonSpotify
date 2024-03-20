import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { MultimediaService } from '../../services/multimedia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.scss']
})
export class CardPlayerComponent implements OnInit,OnDestroy{
  @Input() mode: 'small' | 'big' = 'small';
  @Input() track?: TracksModel;
  public _multimediaService = inject(MultimediaService);
  listSubcripcions$: Array<Subscription> = []
  state: string = 'paused';

  ngOnInit(): void {
    const observer1$ = this._multimediaService.playerStatus$
      .subscribe({
        next: status => {
          this.state = status
        }
      })
    this.listSubcripcions$ = [observer1$]
  }

  sedPlay(track: TracksModel | undefined): void{
    this._multimediaService.trackInfo$.next(track)
    this._multimediaService.positionTrack$.next(track?._id)
  }

  ngOnDestroy(): void {
      this.listSubcripcions$.forEach(u=> u.unsubscribe())
  }
}
