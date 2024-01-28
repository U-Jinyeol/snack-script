import { useMemo } from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  size: number;
  length: number;
  visible: number;
  onPageChange: (selectedPage: number) => void;
}

enum PaginationHandleButton {
  FIRST,
  LAST,
  PREV,
  NEXT,
}

const Pagination = ({
  currentPage,
  size,
  length,
  visible,
  onPageChange,
}: PaginationProps) => {
  const totalPages = useMemo(() => Math.ceil(length / size), [length, size]);
  const currentGroup = useMemo(
    () => Math.ceil(currentPage / visible),
    [currentPage, visible]
  );
  const firstPageInGroup = useMemo(
    () => (currentGroup - 1) * visible + 1,
    [currentGroup, visible]
  );
  const lastPageInGroup = useMemo(
    () => Math.min(currentGroup * visible, totalPages),
    [currentGroup, visible, totalPages]
  );
  const visiblePageRange = useMemo(() => {
    const pageRange = [];
    for (let i = firstPageInGroup; i <= lastPageInGroup; i++) {
      pageRange.push(i);
    }
    return pageRange;
  }, [firstPageInGroup, lastPageInGroup]);

  const handlePaginationButton = (type: PaginationHandleButton) => {
    switch (type) {
      case PaginationHandleButton.FIRST:
        onPageChange(1);
        break;
      case PaginationHandleButton.LAST:
        onPageChange(totalPages);
        break;
      case PaginationHandleButton.PREV:
        onPageChange(currentPage - 1);
        break;
      case PaginationHandleButton.NEXT:
        onPageChange(currentPage + 1);
        break;
      default:
        onPageChange(1);
    }
  };

  return (
    <div className="n-pagination">
      <button
        disabled={currentPage === 1}
        className="item"
        onClick={() => handlePaginationButton(PaginationHandleButton.FIRST)}
      >
        &lt;
      </button>

      <button
        disabled={currentPage === 1}
        className="item"
        onClick={() => handlePaginationButton(PaginationHandleButton.PREV)}
      >
        &lt;&lt;
      </button>

      <div className="number-wrap">
        {visiblePageRange.map((pageNumber, index) => (
          <p
            key={index}
            className={`item ${currentPage === pageNumber ? "active" : ""}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </p>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        className="item"
        onClick={() => handlePaginationButton(PaginationHandleButton.NEXT)}
      >
        &gt;
      </button>

      <button
        disabled={currentPage === totalPages}
        className="item"
        onClick={() => handlePaginationButton(PaginationHandleButton.LAST)}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
