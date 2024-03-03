import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  src?: String
  @Output() callbackData: EventEmitter<any> = new EventEmitter() 

  callSearch(term:string): void{
    if (term.length >= 3) {
      this.callbackData.emit(term)
    }
  }
}
