import {
  Table as FluentTable,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '@fluentui/react-components'
import LoadingSpinner from './LoadingSpinner'

function Table({
  columns,
  data,
  loading = false,
  error = null,
  emptyMessage = 'No data available',
}) {
  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-8">
        {error}
      </div>
    )
  }

  if (!data?.length) {
    return (
      <div className="text-center text-gray-500 p-8">
        {emptyMessage}
      </div>
    )
  }

  return (
    <FluentTable>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell
              key={column.key}
              className={column.className}
            >
              {column.header}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={row.id || rowIndex}>
            {columns.map((column) => (
              <TableCell
                key={`${row.id || rowIndex}-${column.key}`}
                className={column.className}
              >
                {column.render
                  ? column.render(row[column.key], row)
                  : row[column.key]
                }
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </FluentTable>
  )
}

export default Table