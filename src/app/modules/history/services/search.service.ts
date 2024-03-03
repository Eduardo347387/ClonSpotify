import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = environment.apiUrl
  private _http = inject(HttpClient)

  searchTracks$(term:string):Observable<any> {
    return this._http.get(`${this.URL}/tracks?src=${term}`)
      .pipe(
        map((dataRaw:any)=> dataRaw.data)
    )
  }
}
