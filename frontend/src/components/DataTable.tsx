type Column<T> = {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};

export function DataTable<T>({ columns, data }: DataTableProps<T>) {
  return (
    <div className="w-full rounded-2xl shadow-md border border-yellow-500">
      <table className="w-full text-sm text-left">
        {/* HEADER */}
        <thead className="bg-gray-100 text-yellow-500 uppercase text-xs">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className={`px-6 py-3 ${col.className || ""}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* BODY */}
        <tbody className="divide-y divide-gray-200 bg-white text-black">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500"
              >
                Nenhum registro encontrado
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100 transition">
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 ${col.className || ""}`}
                  >
                    {col.render
                      ? col.render(row)
                      : col.accessor
                        ? String(row[col.accessor])
                        : null}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
