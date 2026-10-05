import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g. "/blog/page" or "/category/tech/page"
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  const prevHref = prevPage === 1 ? basePath.replace(/\/page$/, "").replace(/\/page\/?$/, "") || "/blog" : `${basePath}/${prevPage}`;

  return (
    <nav aria-label="Pagination" className="pagination">
      {prevPage ? (
        <Link href={prevHref} className="pagination-btn" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
          <ChevronLeft size={16} /> Previous
        </Link>
      ) : (
        <span className="pagination-btn disabled" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
          <ChevronLeft size={16} /> Previous
        </span>
      )}

      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>

      {nextPage ? (
        <Link href={`${basePath}/${nextPage}`} className="pagination-btn" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
          Next <ChevronRight size={16} />
        </Link>
      ) : (
        <span className="pagination-btn disabled" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
          Next <ChevronRight size={16} />
        </span>
      )}
    </nav>
  );
}
