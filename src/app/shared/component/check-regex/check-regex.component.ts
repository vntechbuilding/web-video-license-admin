import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-regex',
  standalone: true,
  templateUrl: './check-regex.component.html',
  styleUrls: ['./check-regex.component.scss'],
})
export class CheckRegexComponent implements OnInit, OnChanges {
  @Input('regex') regex: Array<{
    regex: string;
    message: string;
  }> = [];
  @Input('hideSuccess') hideSuccess: boolean = false;
  @Input('regexData') regexData: string = '';
  regexValid: { [key: string]: boolean } = {};
  constructor() {}
  __CheckRegex() {
    this.regex.forEach((regexItem) => {
      let regex = new RegExp(regexItem.regex);
      if (regex.test(this.regexData)) {
        this.regexValid[regexItem.message] = true;
      } else {
        this.regexValid[regexItem.message] = false;
      }
    });
  }
  ngOnInit(): void {
    this.__CheckRegex();
  }

  ngOnChanges() {
    this.__CheckRegex();
  }
}
