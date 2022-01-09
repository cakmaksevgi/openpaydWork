import { Component, OnInit, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor() {
    this.indicators = [];
  }

  @Input() waitingList: ReplaySubject<boolean> = new ReplaySubject();

  indicators: boolean[];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.waitingList.subscribe(data => {
      if (!!data) {
        this.indicators.push(data);
        this.checkLoading();
      }
    })
  }

  checkLoading() {
    this.isLoading = this.indicators.filter(x => x).length != this.indicators.filter(x => !x).length;
  }
}
