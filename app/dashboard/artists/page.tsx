import { getArtists } from "@/actions/artists";
import { DataTable } from "@/components/data-table/data-table";
import React from "react";
import { columns, columnsCard } from "./columns";

const ArtistsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page = searchParams["page"] ?? "1";
  const limit = searchParams["limit"] ?? "10";

  const _page = Number(page) > 0 ? Number(page) : 1;
  const _limit = Number(limit) > 0 ? Number(limit) : 20;
  const data = await getArtists({ page: _page, limit: _limit });

  return (
    <div className="px-8 py-4 flex-1 flex flex-col overflow-hidden">
      <DataTable
        currentPage={data.page}
        pageSize={data.limit}
        columns={columns}
        columnsCard={columnsCard}
        data={data.data}
        total={data.total}
      />
    </div>
  );
};

export default ArtistsPage;
