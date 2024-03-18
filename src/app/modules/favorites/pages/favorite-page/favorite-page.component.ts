import { Component, OnInit, inject } from '@angular/core';
import { TracksService } from '@modules/tracks/services/tracks.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit{
  private _tracksService = inject(TracksService)
  listTracks$: Observable<any> = of([]);
  ngOnInit(): void {
    this.listTracks$ = this._tracksService.getAllTracks$();
  }
}
