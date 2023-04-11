interface IPageOption {
  page: number;
  limit: number;
  sortBy?: string;
}

export const createPageOption = (
  page: number,
  pageSize: number,
  sortBy?: string
) => {
  const pageOption: IPageOption = {
    page,
    limit: pageSize,
    sortBy,
  };
  if (!sortBy) delete pageOption.sortBy;
  return pageOption;
};

export default { createPageOption };
