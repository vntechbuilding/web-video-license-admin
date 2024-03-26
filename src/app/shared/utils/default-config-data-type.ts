import { dataType } from '../../pages/template-data/template-data.service';

export const DefaultConfigDataType: { [key in keyof typeof dataType]: string } =
  {
    NEWS: JSON.stringify({}, null, 2),
    NEWS_CATEGORY: JSON.stringify(
      {
        take: 5,
      },
      null,
      2
    ),
    PAGE: JSON.stringify({}, null, 2),
    MENU: JSON.stringify({}, null, 2),
    TEXT: JSON.stringify({}, null, 2),
    SCRIPT: JSON.stringify({}, null, 2),
    IMAGE: JSON.stringify(
      {
        width: 100,
        height: 100,
      },
      null,
      2
    ),
    CONTENT: JSON.stringify({}, null, 2),
  };
