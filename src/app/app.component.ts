import { CommonModule } from '@angular/common';
import {ChangeDetectorRef, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingService} from "./shared/services/loading.service";
import {JwtDataStorageService} from "./shared/services/jwt-data-storage.service";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    public loading: LoadingService,
    private cd: ChangeDetectorRef,
    private jwtDataStorage: JwtDataStorageService
  ) {
    // this.AuthApiService.__CheckUserData();
    this.jwtDataStorage.loadToken().subscribe();
    this.loading.loading$.pipe(debounceTime(50)).subscribe((loadingData) => {
      this.loadingData = loadingData;
    });
  }
  _loadingData: boolean = false;
  set loadingData(value: boolean) {
    this._loadingData = value;
    this.cd.detectChanges();
  }
  get loadingData() {
    return this._loadingData;
  }
}
