export type TableColumnsCard<T> = {
  accessorKey: keyof T | "ACTIONS";
  header: React.ReactNode;
};
