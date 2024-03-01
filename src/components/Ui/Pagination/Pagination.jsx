import { usePagination } from "../../../hooks/usePagination";
const Pagination = ({ totalPages, page, changePage, setFilter }) => {
  let pagesArray = usePagination(totalPages)
  return (
    <div className="page__wrapper">
      {pagesArray.map(p =>
        <span
          key={p}
          className={page === p ? 'page page__current' : 'page'}
          onClick={() => {
            changePage(p)
            setFilter({ sort: '', query: '' })
          }}
        >
          {p}
        </span>
      )}
    </div>
  );
}

export default Pagination;