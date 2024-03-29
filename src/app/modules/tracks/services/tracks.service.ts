import { Injectable, inject } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private _httpClient = inject(HttpClient)
  private readonly URL = environment.apiUrl

  constructor() { }
  
  getAllTracks$():Observable<any> {
    return this._httpClient.get(`${this.URL}/tracks`)
      .pipe(
        map(({data}:any) => {
          return data
      })
    )
  }

   getAllRamdom$():Observable<any> {
    return this._httpClient.get(`${this.URL}/tracks`)
      .pipe(
        map(({data}:any) => {
          return data.reverse()
      })
    )
   }
  
}
