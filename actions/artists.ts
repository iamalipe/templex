import { db } from "@/db";
import { Artist, Prisma } from "@prisma/client";

export type SortField = {
  field: keyof Prisma.ArtistOrderByWithRelationInput;
  order: "asc" | "desc";
};
export type GetArtistsProps = {
  limit?: number;
  page?: number;
  orderBy?: SortField[]; // Array of sorting criteria for multi-level sorting
  filter?: Partial<Prisma.ArtistWhereInput>;
};
export const getArtists = async ({
  limit = 20,
  page = 1,
  orderBy = [{ field: "fullName", order: "asc" }], // Default sort by name ascending
  filter = {},
}: GetArtistsProps) => {
  const offset = (page - 1) * limit;

  const response = await db.artist.findMany({
    where: {
      ...filter,
      fullName: {
        contains: "",
        mode: "insensitive",
      },
    },
    orderBy: orderBy.reduce((acc, { field, order }) => {
      acc[field] = order;
      return acc;
    }, {} as Prisma.ArtistOrderByWithRelationInput),
    take: limit,
    skip: offset,
  });
  const total = await db.artist.count({
    where: {
      ...filter,
      fullName: {
        contains: "",
        mode: "insensitive",
      },
    },
  });

  return { data: response, total: total, limit: limit, page: page };
};
