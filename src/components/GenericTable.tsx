import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export interface Column<T> {
  field: keyof T;
  headerName: string;
}

interface GenericTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit: (data: T) => void;
  onDelete: (id: T[keyof T]) => void;
}

const GenericTable = <T extends { id: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
}: GenericTableProps<T>) => {
  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Ações",
    flex: 1,
    renderCell: (params) => (
      <>
        <IconButton onClick={() => onEdit(params.row as T)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      </>
    ),
  };

  const gridColumns: GridColDef[] = [
    ...columns.map((col) => ({
      field: col.field as string,
      headerName: col.headerName,
      flex: 1,
    })),
    actionColumn,
  ];

  return (
    <div style={{ height: 400, width: "100%", marginTop: 16 }}>
      <DataGrid
        rows={data as GridRowsProp}
        columns={gridColumns}
        autoPageSize
        pageSizeOptions={[10, 25, 50, 100]}
        pagination
        checkboxSelection
      />
    </div>
  );
};

export default GenericTable;
