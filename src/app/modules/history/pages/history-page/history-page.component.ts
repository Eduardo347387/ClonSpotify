import { Component, inject } from '@angular/core';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent {
  private _searchService = inject(SearchService)
  listResults$: Observable<any> = of([])
  
  receiveData(event: string): void{
    this.listResults$ = this._searchService.searchTracks$(event)
  }
}
