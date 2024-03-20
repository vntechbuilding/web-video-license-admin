import { inject } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

export abstract class ModalContentBase<T> {
  public readonly modal = inject(NzModalRef);
  public readonly nzModalData: T = inject(NZ_MODAL_DATA);

  destroyModal(destroyData: any): void {
    // console.log(destroyData);
    this.modal.close(destroyData);
    // this.modal.triggerOk().then();
  }
}
