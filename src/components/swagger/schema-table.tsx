import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type SchemaRow = {
  name: string;
  type: string;
  value: string | number | null;
  required?: boolean;
};

export function SchemaTable({ rows }: { rows: SchemaRow[] }) {
  return (
    <div className="overflow-hidden rounded border border-swagger-border">
      <Table>
        <TableHeader>
          <TableRow className="border-swagger-border bg-swagger-surface-muted hover:bg-swagger-surface-muted">
            <TableHead className="font-mono text-xs font-semibold text-[var(--swagger-post)]">
              Name
            </TableHead>
            <TableHead className="font-mono text-xs font-semibold text-[var(--swagger-post)]">
              Type
            </TableHead>
            <TableHead className="font-mono text-xs font-semibold text-[var(--swagger-post)]">
              Value
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              className="border-swagger-border bg-swagger-surface hover:bg-swagger-surface-muted"
            >
              <TableCell className="font-mono text-sm text-swagger-text">
                {row.name}
                {row.required && (
                  <span className="ml-1 text-[var(--swagger-delete)]">*</span>
                )}
              </TableCell>
              <TableCell className="font-mono text-sm text-[var(--swagger-get)]">
                {row.type}
              </TableCell>
              <TableCell className="text-sm text-swagger-muted">
                {row.value ?? "null"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
