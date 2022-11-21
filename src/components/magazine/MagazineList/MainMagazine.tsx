import { css } from '@emotion/react';

import MagazineListItem from '@/components/magazine/MagazineList/MagazineListItem';

interface MainMagazineProps {
  magazines: Magazine[];
}
const MainMagazine = ({ magazines }: MainMagazineProps) => {
  return (
    <div
      css={css`
        display: flex;
        overflow-x: scroll;
        width: 100%;
        gap: 10px;
      `}
    >
      {magazines.map((magazine) => (
        <MagazineListItem key={magazine.src} magazine={magazine} width={'120px'} height={'155px'} />
      ))}
    </div>
  );
};

export default MainMagazine;
