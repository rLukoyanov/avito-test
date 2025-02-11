import { useState } from "react";

type Params = {
  total: number;
  pageSize?: number;
};

export const usePagination = ({ pageSize = 5, total }: Params) => {
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    page,
    setPage,
    pageSize,
    paginationProps: {
      total,
      current: page,
      pageSize,
      onChange: handlePageChange,
    },
  };
};
