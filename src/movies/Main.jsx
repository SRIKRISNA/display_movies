import { useEffect, useState } from "react";
import "./style.css";
import Card from "./Card";
import Pagination from "./pagination";

var API_key = "&api_key=7c01b82b0aa395aad5febf7f163923a8";
var base_URL = "https://api.themoviedb.org/3";
var url = base_URL + "/discover/movie?sort_by=popularity.desc" + API_key;
var top_rated_movie = base_URL + "/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc" + API_key;
var upcoming_movie = base_URL + "/discover/movie?primary_release_date.gte=2022-11-30" + API_key;
var arrData = ["Popular", "Top Rated", "Upcoming"]

function Main() {
    const [movieData, setMovieData] = useState([]);
    const [url_set, setURL] = useState(url);
    const [search, setSearch] = useState();
    // const [count, setCount] = useState(1);

    const [curPage, setCurPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);

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

    const getData = (movieType) => {
        if (movieType === "Popular")
            url = base_URL + "/discover/movie?sort_by=popularity.desc" + API_key;
        if (movieType === "Top Rated") {
            url = top_rated_movie;
        }
        if (movieType === "Upcoming")
            url = upcoming_movie;
        setURL(url)
    }

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
                <nav>
                    <ul>
                        {
                            arrData.map((value) => {
                                return (
                                    <li><a href="#" name={value} onClick={(e) => { getData(e.target.name) }}>{value}</a></li>
                                )
                            })
                        }
                    </ul>
                </nav>
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
                totalPosts={movieData.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurPage}
                curPage={curPage}
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