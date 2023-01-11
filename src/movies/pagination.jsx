
const Pagination = ({totalPosts, postsPerPage, setCurrentPage, curPage}) => {
    let pages =[];

    for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
        pages.push(i);
    }

    return(
        <div className="pagination">
            {
                pages.map((page, index) => {
                    return <button key={index} onClick={() => setCurrentPage(page)}
                    className={page === curPage ? 'active' : ''}>{page}</button>
                })
            }
        </div>
    )
}
export default Pagination;