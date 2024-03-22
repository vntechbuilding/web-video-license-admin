import { domain } from '../../pages/domain/domain.service';

export const CreateUrl = (domain: domain, url: string) => {
  return domain.domain + '/' + url;
};
