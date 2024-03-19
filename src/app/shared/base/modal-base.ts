import { inject, TemplateRef, Type } from '@angular/core';
import { ModalOptions, NzModalService } from 'ng-zorro-antd/modal';

export abstract class ModalBase {
  public readonly modalCtrl = inject(NzModalService);

  public createModal(opts: ModalOptions) {
    return this.modalCtrl.create({ ...opts });
  }

  public createComponentModal<T, IModalData>(
    opts: ModalOptions,
    content: Type<T>,
    nzData?: IModalData
  ) {
    const modal = this.modalCtrl.create<T>({
      ...opts,
      nzContent: content,
      nzData: nzData,
    });
    // const instance = modal.getContentComponent();
    return modal;
  }

  public closeAllModal() {
    this.modalCtrl.closeAll();
  }
}
