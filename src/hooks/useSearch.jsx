import { useState, useMemo } from "react";

const useSearch = (data, columns, searchQuery) => {
  const [query, setQuery] = useState(searchQuery);

  const filteredData = useMemo(() => {
    if (!query) return data;
    return data.filter((row) =>
      columns.some((column) =>
        column.selector
          ? column
              .selector(row)
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase())
          : column
              .cell(row)
              .toString()
              .toLowerCase()
              .includes(query.toLowerCase())
      )
    );
  }, [query, data, columns]);

  return {
    query,
    setQuery,
    filteredData,
  };
};

export default useSearch;
