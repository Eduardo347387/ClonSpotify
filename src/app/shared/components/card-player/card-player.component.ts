import { Component, Input, inject } from '@angular/core';
import { TracksModel } from '@core/models/tracks.model';
import { MultimediaService } from '../../services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.scss']
})
export class CardPlayerComponent {
  @Input() mode: 'small' | 'big' = 'small';
  @Input() track?: TracksModel;

  private _multimediaService = inject(MultimediaService);

  sedPlay(track: TracksModel | undefined): void{
  
    this._multimediaService.callback.emit(track);
  }
}
