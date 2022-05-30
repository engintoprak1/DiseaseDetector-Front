import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'dd-button',
  templateUrl: './dd-button.component.html',
  styleUrls: ['./dd-button.component.scss'],
})
export class DdButtonComponent implements OnInit {
@Input() buttonText = 'Kaydet';
@Input() isGreen = true;
@Output() onBtnClick:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  onButtonClick(event: any) {
    this.onBtnClick.emit(event);
  }

}
