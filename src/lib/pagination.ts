export function paginate<T>(items: T[], page: number, perPage: number) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const start = (safePage - 1) * perPage;
  const end = start + perPage;

  return {
    page: safePage,
    perPage,
    total,
    totalPages,
    items: items.slice(start, end),
    hasPrev: safePage > 1,
    hasNext: safePage < totalPages,
    prevPage: safePage > 1 ? safePage - 1 : null,
    nextPage: safePage < totalPages ? safePage + 1 : null,
  };
}