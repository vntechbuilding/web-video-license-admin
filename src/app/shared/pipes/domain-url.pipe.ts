import { Pipe, PipeTransform } from '@angular/core';
import { domain } from '../../pages/domain/domain.service';
import { CreateUrl } from '../utils/create-url';
@Pipe({
  name: 'domainUrl',
  standalone: true,
})
export class DomainUrlPipe implements PipeTransform {
  transform(url: string, domain: domain): string {
    if (domain) return CreateUrl(domain, url);
    else return url;
  }
}
