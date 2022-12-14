import { css } from '@emotion/react';

import RoundPhoto from '@/components/common/Photo/RoundPhoto';

interface ProfileProps {
  src: string;
  name: string;
  date: string;
}

const Profile = ({ src, name, date }: ProfileProps) => {
  return (
    <div
      css={css`
        display: grid;
        row-gap: 3px;
        column-gap: 6px;
        align-items: center;
        width: fit-content;
      `}
    >
      <RoundPhoto src={src} width={'19px'} height={'19px'} />
      <span
        css={(theme) =>
          css`
            ${theme.font.M_BODY_12};
            color: ${theme.color.gray04};
            line-height: 17px;
          `
        }
      >
        {name}
      </span>
      <span
        css={(theme) =>
          css`
            ${theme.font.R_BODY_11};
            color: ${theme.color.gray07};
            line-height: 16px;
            grid-column: 1 / span 2;
            text-align: end;
          `
        }
      >
        {date}
      </span>
    </div>
  );
};
export default Profile;
