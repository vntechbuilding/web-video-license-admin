import { Component } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { Mixin } from 'ts-mixer';
import { ModalBase } from '../../shared/base/modal-base';

import Editor from '@vntechbuilding/custom-ckeditor';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CKEditorModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent extends Mixin(ModalBase) {
  public Editor = Editor.Editor;
  constructor() {
    super();
  }
}
