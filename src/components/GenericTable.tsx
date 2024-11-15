import {
  DataGrid,
  GridColDef,
  GridColTypeDef,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../hooks/useAuth";

export interface Column<T> extends GridColTypeDef {
  field: keyof T;
  headerName: string;
}

interface GenericTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (data: T) => void;
  onDelete?: (id: T[keyof T]) => void;
}

const GenericTable = <T extends { id: string | number }>({
  columns,
  data,
  onEdit,
  onDelete,
}: GenericTableProps<T>) => {
  const { isAdminUser } = useAuth();

  const hasOnEdit = !!onEdit;
  const hasOnDelete = !!onDelete;
  const hasActions = hasOnEdit && hasOnDelete;

  const gridColumns: GridColDef[] = [
    ...columns.map((col) => ({
      ...col,
      field: col.field as string,
      flex: 1,
    })),
    ...(hasActions && isAdminUser()
      ? [
          {
            field: "actions",
            headerName: "Ações",
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
              <>
                {hasOnEdit && (
                  <IconButton onClick={() => onEdit(params.row as T)}>
                    <EditIcon />
                  </IconButton>
                )}
                {hasOnDelete && (
                  <IconButton onClick={() => onDelete(params.row.id)}>
                    <DeleteIcon />
                  </IconButton>
                )}
              </>
            ),
          },
        ]
      : []),
  ];

  return (
    <div style={{ height: 400, width: "100%", marginTop: 16 }}>
      <DataGrid
        rows={data as GridRowsProp}
        columns={gridColumns}
        autoPageSize
        pageSizeOptions={[10, 25, 50, 100]}
        pagination
        rowSelection={false}
      />
    </div>
  );
};

export default GenericTable;
