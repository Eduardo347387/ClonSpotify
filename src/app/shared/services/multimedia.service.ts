import { EventEmitter, Injectable } from '@angular/core';
import { TracksModule } from '@modules/tracks/tracks.module';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>()

  constructor() { }


}
