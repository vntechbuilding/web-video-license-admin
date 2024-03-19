import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-regex-password',
  standalone: true,
  templateUrl: './check-regex-password.component.html',
  styleUrls: ['./check-regex-password.component.scss'],
})
export class CheckRegexPasswordComponent implements OnInit {
  regex: Array<{
    regex: string;
    message: string;
  }> = [
    // /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/
    {
      regex: '^[A-Za-z\\d@$!%*#?&]{6,}$',
      message: 'Ít nhất 6 ký tự',
    },
    {
      regex: '^(?=.*[A-Z])[A-Za-z\\d@$!%*#?&]{1,}$',
      message: 'Ít nhất 1 chữ hoa',
    },
    {
      regex: '^(?=.*[a-z])[A-Za-z\\d@$!%*#?&]{1,}$',
      message: 'Ít nhất 1 chữ thường',
    },
    {
      regex: '^(?=.*\\d)[A-Za-z\\d@$!%*#?&]{1,}$',
      message: 'Ít nhất 1 chữ số',
    },
    //   {
    //   regex: "^(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{1,}$",
    //   message: "Ít nhất 1 ký tự đặc biệt"
    // }
  ];
  @Input('passwordData') passwordData!: any;
  @Input('hideSuccess') hideSuccess: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
