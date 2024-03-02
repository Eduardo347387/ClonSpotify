import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TracksModule } from '@modules/tracks/tracks.module';
import { TracksService } from '@modules/tracks/services/tracks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.scss']
})
export class TracksPageComponent implements OnInit, OnDestroy{
  tracksTrending: Array<TracksModule> = []
  tracksRamdom: Array<TracksModule> = []
  listObservers$: Array<Subscription> = []

  private _tracksService = inject(TracksService);

  ngOnInit(): void {
    this.loadDataAll()
    this.loadDataRandom()
  }

  loadDataAll(): void{
    this._tracksService.getAllTracks$()
      .subscribe(response => {
      this.tracksTrending = response
    })
  }
  loadDataRandom(): void{
    this._tracksService.getAllRamdom$()
      .subscribe(response => {
      this.tracksRamdom = response
    })
  }
  
  ngOnDestroy(): void {

  }
}
