import { domain } from '../../pages/domain/domain.service';

export const CreateUrl = (domain: domain, url: string) => {
  return (
    (domain.https ? 'https://' : 'http://') +
    domain.domain +
    '/' +
    (url.startsWith('/') ? url.slice(1) : url)
  );
};
