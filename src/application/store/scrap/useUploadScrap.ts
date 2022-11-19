import { useRecoilState } from 'recoil';

import type { UploadScrapState } from '@/application/store/scrap/uploadScrap';
import { uploadScrapState } from '@/application/store/scrap/uploadScrap';

type HandleScrapArgs =
  | {
      type: 'category';
      data: Pick<UploadScrapState, 'category_id'>['category_id'];
    }
  | { type: 'information'; data: Pick<UploadScrapState, 'title' | 'hashtags' | 'memo'> }
  | { type: 'file'; data: Pick<UploadScrapState, 'file'>['file'] }
  | { type: 'link'; data: string }
  | { type: 'text'; data: string };

const useUploadScrap = () => {
  const [scrap, setScrap] = useRecoilState(uploadScrapState);

  // TODO reducer 비슷한데 더 좋은 방법 없을지?
  const handleScrap = ({ type, data }: HandleScrapArgs) => {
    console.log('👀 UploadScrapState :::', type, data);
    switch (type) {
      case 'category':
        setScrap((prev) => ({ ...prev, category_id: data }));
        break;
      case 'file':
        setScrap((prev) => ({ ...prev, file: data, scrap_type: 'IMAGE' }));
        break;
      case 'text':
        setScrap((prev) => ({ ...prev, content: data, scrap_type: 'TEXT' }));
        break;
      case 'link':
        setScrap((prev) => ({ ...prev, content: data, scrap_type: 'LINK' }));
        break;
      case 'information':
        setScrap((prev) => ({ ...prev, ...data }));
        break;
    }
  };

  return [scrap, handleScrap] as const;
};

export default useUploadScrap;
