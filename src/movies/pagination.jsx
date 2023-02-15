import { useEffect, useState } from "react";

const Pagination = ({showperPage, total, onPaginationChange}) => {
    // let pages =[];

    // for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
    //     pages.push(i);
    // }
    const [count, setCount] = useState(1);
    const numButton = Math.ceil(total / showperPage);

    const pageNum =[];
    for(let i=1; i<=numButton; i++){
        pageNum.push(i);
    }
    useEffect(()=>{
        const value = showperPage * count;
        onPaginationChange(value - showperPage, value);
    }, [count]);

    const buttonHandle = (btn) => {
        if(btn === "prev") {
            if(count === 1) setCount(1);
            else setCount(count - 1);
        }else if(btn === "next") {
            if(numButton === count) setCount(count);
            else setCount(count+1);
        }
    }

    return(
        <div className="pagination">
            <div className="btns" onClick={()=> buttonHandle("prev")}>
                <span>Prev</span>
            </div>
            {
                pageNum.map((curPage, index)=> {
                    return(
                        <span key={index} className={count === index+1 ? "red" : "gray"}>{curPage}</span>
                    )
                })
            }
            <div className="btns" onClick={()=> buttonHandle("next")}>
                <span>Next</span>
            </div>
            {/* {
                pages.map((page, index) => {
                    return <button key={index} onClick={() => setCurrentPage(page)}
                    className={page === curPage ? 'active' : ''}>{page}</button>
                })
            } */}
        </div>
    )
}
export default Pagination;