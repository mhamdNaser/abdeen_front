import DataTable from "react-data-table-component";
import styled from "styled-components";

export const DataTableStyled = styled(DataTable)`
  .laPPHD {
    background-color: transparent !important;
  }
  .hDHZZh {
    background-color: transparent !important;
  }
  margin: 0 0;
  & .rdt_Table {
    min-width: 100%;
    background-color: ${(props) =>
      props.$mode === "dark" ? "rgb(50, 50, 60)" : "#fff"};
    color: var(--primary-text);
    padding: 16px;

    .rdt_TableRow,
    .rdt_TableHead,
    .rdt_TableHeadRow {
      background-color: var(--blocks-color);
      color: var(--primary-text);
    }
    .rdt_TableRow {
      
    
    }
    .rdt_TableHeadRow {
      font-size: 16px;
    }
    .jWOtlo:not(:last-of-type),
    .idxdtx {
      border-bottom-color: ${(props) =>
        props.$mode === "dark" ? "rgb(80, 80, 90)" : "rgb(200, 200, 200)"};
    }
  }
  ~ div .rdt_Pagination {
    background-color: ${(props) =>
      props.$mode === "dark" ? "rgb(50, 50, 60)" : "#fff"};
    color: var(--primary-text);
    padding: 16px;

    .dihybH {
      color: var(--primary-text);
      &:disabled {
        color: rgb(190, 200, 210) !important;
      }
    }
  }
`;

export const Page = styled.div`
  margin: 2rem 0px;
`;
