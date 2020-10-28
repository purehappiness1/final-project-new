import React, { useState, useRef, useCallback } from "react";
import Paper from "@material-ui/core/Paper";
import { GridExporter } from '@devexpress/dx-react-grid-export';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  TableEditRow,
  TableEditColumn,
  DragDropProvider,
  TableColumnReordering,
  VirtualTable,
  ExportPanel,
  Toolbar,
} from "@devexpress/dx-react-grid-material-ui";

import {
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
  EditingState,
} from "@devexpress/dx-react-grid";

import saveAs from 'file-saver';
import { generateRows, globalSalesValues } from "../demo-data/generator";
import { orders } from '../demo-data/orders';

const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
  });
};

const columnsas = [
  { name: 'Employee', title: 'Employee' },
  { name: 'OrderNumber', title: 'Invoice Number' },
  { name: 'CustomerStoreCity', title: 'City' },
  { name: 'SaleAmount', title: 'Sale Amount' },
];

const DataClients = () => {
  const exporterRef = useRef(null);

  const startExport = useCallback(() => {
    exporterRef.current.exportGrid();
  }, [exporterRef]);

  const [columns] = useState([
    { name: "region", title: "Region" },
    { name: "sector", title: "Sector" },
    { name: "customer", title: "Customer" },
    { name: "product", title: "Product" },
    { name: "amount", title: "Sale Amount" },
  ]);

  const [tableColumnExtensions] = useState([
    { columnName: 'region', width: 100 },
  ]);

  const getRowId = row => row.id;

  const [rows, setRows] = useState(generateRows({
    columnValues: { id: ({ index }) => index, ...globalSalesValues },
    length: 8,
  }));

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  return (
    <Paper>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
      <VirtualTable />
      <Toolbar />
        <ExportPanel startExport={startExport} />
      <EditingState onCommitChanges={commitChanges}/>
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <SortingState defaultSorting={[{ columnName: "city", direction: "asc" }]}/>
        <IntegratedSorting />
        <DragDropProvider />
        <Table columnExtensions={tableColumnExtensions} />
        <TableColumnReordering
          defaultOrder={['region', 'sector', 'customer', 'product', 'amount']}/>
        <TableHeaderRow showSortingControls />
        <TableFilterRow />
        <TableEditRow />
        <TableEditColumn
          showAddCommand
          showEditCommand
          showDeleteCommand/>
      </Grid>
      <GridExporter
        ref={exporterRef}
        rows={orders}
        columns={columnsas}
        onSave={onSave}/>
    </Paper>
  );
};



















export default DataClients;
