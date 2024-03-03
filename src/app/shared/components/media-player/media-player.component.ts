import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TracksModule } from '@modules/tracks/tracks.module';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss']
})
export class MediaPlayerComponent implements OnInit, OnDestroy{
  
  public _multimediaService = inject(MultimediaService);
  listObservers$:Array<Subscription> = []
  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe());
  }

}
