import CustomButton from "../atom/CustomButton";

export default function Pagination({
  currentPage,
  itemsPerPage,
  pageCount,
  setSkip,
  setCurrentPage,
}) {
  const pageDisplay = Array.from(
    { length: pageCount },
    (_, index) => index + 1
  );
  const handleNextClick = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
      setSkip(currentPage * itemsPerPage);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSkip((currentPage - 2) * itemsPerPage);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSkip((pageNumber - 1) * itemsPerPage);
  };

  console.log(currentPage);
  return (
    <>
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item">
            <CustomButton
              type="button"
              className="page-link"
              onClick={handlePreviousClick}
            >
              Previous
            </CustomButton>
          </li>
          {pageDisplay
            .slice(
              Math.max(0, currentPage - 3),
              Math.min(pageCount, currentPage + 2)
            )
            .map((item) => {
              return (
                <>
                  <li
                    className={item === currentPage ? "active" : "page-item "}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => handlePageClick(item)}
                    >
                      {" "}
                      {item}{" "}
                    </button>
                  </li>
                </>
              );
            })}
          <li className="page-item">
            <CustomButton
              type="button"
              className="page-link"
              onClick={handleNextClick}
            >
              Next
            </CustomButton>
          </li>
        </ul>
      </nav>
    </>
  );
}
