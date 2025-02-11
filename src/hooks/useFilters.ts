import { useEffect, useMemo, useState } from "react";
import { Categories } from "../types/api";
import { useSearchParams } from "react-router-dom";

export const useFilters = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Categories>();
  const [searchParams] = useSearchParams();
  useEffect(() => {
    setSearch(searchParams.get('search') || '')
    setCategory(searchParams.get('category') as Categories)
  }, [])

  return useMemo(
    () => ({
      search,
      category,

      setSearch,
      setCategory,
    }),
    [search, category]
  );
};
