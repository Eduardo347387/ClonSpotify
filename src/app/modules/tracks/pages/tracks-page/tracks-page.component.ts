import { Component, OnInit } from '@angular/core';
import * as dataRaw from '../../../../data/tracks.json'
import { TracksModule } from '@modules/tracks/tracks.module';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.scss']
})
export class TracksPageComponent implements OnInit {
  mockTracksList:Array<TracksModule> = []
  
  ngOnInit(): void {
    const { data }: any = (dataRaw as any).default
    this.mockTracksList = data;
  }
  
}
