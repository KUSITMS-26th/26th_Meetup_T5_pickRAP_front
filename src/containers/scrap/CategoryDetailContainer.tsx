import { css } from '@emotion/react';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';

import { useGetContentByCategory, useUpdateCategory } from '@/application/hooks/api/category';
import useModal from '@/application/hooks/common/useModal';
import usePopup from '@/application/hooks/common/usePopup';
import { ERR_CODE } from '@/application/utils/constant';
import CreateCategory from '@/components/scrap/Popup/CreateCategory';
import PhotoListContainer from '@/containers/scrap/PhotoListContainer';

interface CategoryDetailContainerProps {
  info: { id: number; name: string };
  select?: boolean;
}

const CategoryDetailContainer = ({ select, info }: CategoryDetailContainerProps) => {
  const { categories } = useGetContentByCategory({ id: info.id });
  const [categoryName, setCategoryName] = useState(info.name);
  const mutation = useUpdateCategory();
  const { show } = useModal();
  const popup = usePopup();
  return (
    <>
      <span
        css={(theme) =>
          css`
            ${theme.font.B_POINT_20};
            line-height: 160%;
            color: ${theme.color.black02};
            margin-top: 26px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
          `
        }
      >
        {categoryName}
        <button
          onClick={() =>
            show(
              <CreateCategory
                onSubmit={(category, setError) => {
                  mutation.mutate(
                    { id: info.id, name: category },
                    {
                      onSuccess: async () => {
                        setCategoryName(category);
                        popup('성공적으로 수정 되었습니다', 'success');
                      },
                      onError: (err) => {
                        if (axios.isAxiosError(err)) {
                          err.response?.data.code === ERR_CODE.DUPLICATED_CATEGORY && setError(true);
                        }
                      },
                    },
                  );
                }}
              />,
            )
          }
          css={css`
            margin-left: 6px;
            width: 22px;
            height: 22px;
            position: relative;
          `}
        >
          <Image src={'/icon/edit.svg'} layout={'fill'} objectFit={'cover'} />
        </button>
      </span>
      <PhotoListContainer data={categories} select={select} />
    </>
  );
};

export default CategoryDetailContainer;
