import { useEffect, useState } from "react";
import "./style.css";
import Card from "./Card";
import Pagination from "./pagination";

var API_key = "&api_key=7c01b82b0aa395aad5febf7f163923a8";
var base_URL = "https://api.themoviedb.org/3";
var url = base_URL + "/discover/movie?sort_by=popularity.desc" + API_key;

function Main() {
    const [movieData, setMovieData] = useState([]);
    const [url_set, setURL] = useState(url);
    const [search, setSearch] = useState();
    // const [count, setCount] = useState(1);

    const [curPage, setCurPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const lastPostIndex = curPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = movieData.slice(firstPostIndex, lastPostIndex);


    // const Prev = () => setCount(count => count - 1)
    // const Next = () => setCount(count => count + 1)

    useEffect(() => {
        // event.preventDefault()
        fetch(url_set).then(res => res.json()).then(data => {
            setMovieData(data.results);
        })
    }, [url_set])

    function SearchResult(event) {
        event.preventDefault()
        url = base_URL + "/search/movie?api_key=7c01b82b0aa395aad5febf7f163923a8&query=" + search;
        setURL(url)
        setSearch(" ")
    }

    return (
        <>
            <div className="header">
                <h3>MovieDb</h3>

                <form>
                    <div className="searchBox">
                        {/* onKeyPress={searchMovie} */}
                        <input type="text" placeholder="Search Movie Name" className="searchText" onChange={(e) => { setSearch(e.target.value) }} value={search} ></input>
                        <button className="search-btn" onClick={SearchResult}><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </div>
            <div className="container">
                {
                    (currentPosts.length === 0)
                        ? <p className="notfond">Not Found (404)</p>
                        : currentPosts.map((res, pos) => {
                            return (
                                <Card info={res} key={pos} />
                            )
                        })
                }
            </div>
            <Pagination 
                totalPosts = {movieData.length}
                postsPerPage = {postsPerPage}
                setCurrentPage={setCurPage}
            />
            {/* <div className="pagination">
                <button onClick={Prev}>Prev</button>
                {`Page ${count}`}
                <button onClick={Next}>Next</button>
            </div> */}
        </>
    )
}
export default Main;