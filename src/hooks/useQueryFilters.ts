import { useEffect, useRef } from "react";
import qs from "qs";

import { Categories } from "../types/api";
import { removeEmpty } from "../utils/removeEmpty";

type Filters = {
  category: Categories,
  search: string
}

export const useQueryFilters = (filters: Partial<Filters>) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const params = removeEmpty({
        ...filters,
      });

      const query = qs.stringify(params, {
        arrayFormat: "comma",
      });

      window.history.pushState(null, "", `?${query}`);
    }

    isMounted.current = true;
  }, [filters]);
};
