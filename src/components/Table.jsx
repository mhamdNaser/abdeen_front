import React, { useEffect, useState } from "react";
import useSearch from "../hooks/useSearch";
import Pagination from "../components/Pagination";
import Search from "../components/Search";
import RowsPerPage from "../components/RowsPerPage";
import usePagination from "../hooks/usePagination";
import useExport from "../hooks/useExport";
import { BsFiletypeXls, BsFiletypePdf } from "react-icons/bs";

const Table = ({
  header,
  footer,
  Title,
  print,
  columns,
  direction,
  search,
  data,
  hasEditPermission,
  translations,
  editBtnFun,
  handleDelete,
  setSelectedItemsProp,
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { query, setQuery, filteredData } = useSearch(data, columns, "");
  const { currentPage, totalPages, currentData, handlePageChange } =
    usePagination(filteredData, rowsPerPage);
  const [selectedItems, setSelectedItems] = useState([]);
  const { exportToPDF, exportToExcel } = useExport(
    currentData.map((item) => {
      const { action, ...rest } = item;
      return rest;
    }),
    columns.filter((col) => col.name !== "Action")
  );

  useEffect(() => {
    setSelectedItemsProp(selectedItems);
  }, [selectedItems, setSelectedItemsProp]);

  const toggleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  return (
    <div className="overflow-x-auto">
      {header === false ? null : (
        <div className="flex justify-between items-center">
          <div
            className={`text-xl font-bold ${
              direction === "rtl" ? "text-right" : "text-left"
            }`}
          >
            {(translations && translations[`${Title}`]) || Title}
          </div>
          <div
            className={`flex gap-4 ${
              direction === "rtl" ? "flex-row-reverse" : ""
            } mb-4`}
          >
            <RowsPerPage
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={setRowsPerPage}
              filteredDataLength={filteredData.length}
            />
            { search !== false ? (<Search query={query} onSearchChange={setQuery} />) : (null)}
            {print === false ? null : (
              <>
                <button
                  onClick={exportToPDF}
                  className="bg-redColor text-xl text-white px-2"
                >
                  <BsFiletypePdf />
                </button>
                <button
                  onClick={exportToExcel}
                  className="bg-greenColor text-xl text-white px-2"
                >
                  <BsFiletypeXls />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <table
        className="min-w-full bg-white shadow-md overflow-hidden"
        dir={direction}
      >
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="py-3 px-0"></th>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`py-3 px-4 uppercase font-semibold text-sm ${
                  direction === "ltr" ? "text-left" : "text-right"
                }`}
                style={{ maxWidth: column.maxWidth }}
              >
                {(translations && translations[`${column.name}`]) ||
                  column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!currentData || currentData.length === 0 ? (
            <tr className="border-b border-gray-400 hover:bg-gray-200 bg-gray-100">
              <td
                colSpan={columns.length + 1}
                className="py-6 px-4 text-center"
              >
                no data to view
              </td>
            </tr>
          ) : (
            currentData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-400 hover:bg-background-color bg-blocks-color"
              >
                <td className="py-3 px-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(row.id)}
                    onChange={() => toggleSelectItem(row.id)}
                  />
                </td>
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`py-3 px-4 ${
                      direction === "ltr" ? "text-left" : "text-right"
                    }`}
                    style={{ maxWidth: column.maxWidth }}
                  >
                    {column.selector
                      ? column.selector(row)
                      : column.cell(
                          row,
                          hasEditPermission,
                          editBtnFun,
                          handleDelete
                        )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {footer === false ? null : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Table;
