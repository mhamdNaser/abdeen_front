import { jsPDF } from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

const useExport = (data, columns) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableColumn = columns.map((col) => col.name);
    const tableRows = data.map((row) =>
      columns.map((col) => {
        return {
          content: col.selector ? col.selector(row) : "", // Get actual cell value
          styles: { cellWidth: "auto" }, // Optionally adjust cell width
        };
      })
    );

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("table.pdf");
  };

  const exportToExcel = () => {
    const filteredDataForExcel = data.map((item) => {
      const { action, ...rest } = item;
      return rest;
    });

    const worksheet = XLSX.utils.json_to_sheet(
      filteredDataForExcel.map((row) => {
        return columns.reduce((acc, col) => {
          acc[col.name] = col.selector ? col.selector(row) : ""; // Ensure to get actual cell value
          return acc;
        }, {});
      })
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Table");
    XLSX.writeFile(workbook, "table.xlsx");
  };

  return { exportToPDF, exportToExcel };
};

export default useExport;
