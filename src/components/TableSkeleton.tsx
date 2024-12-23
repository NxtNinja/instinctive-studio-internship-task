import { TableBody, TableCell, TableRow } from "./ui/table";
import { Skeleton } from "./ui/skeleton";

const TableSkeleton = ({}) => {
  return (
    <TableBody>
      {[...Array(5)].map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-6 w-32" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-24" />
          </TableCell>
          <TableCell>
            <div className="flex gap-2">
              {[...Array(2)].map((_, i) => (
                <Skeleton key={i} className="h-7 w-24 rounded-md" />
              ))}
            </div>
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-36" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-6 w-40" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-4 rounded-full" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableSkeleton;
