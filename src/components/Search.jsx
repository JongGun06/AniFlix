import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css'
import Header from "./Header";


const Search = () => {

    let [search, setSearch] = useState('')
  let [titles, setTitles] = useState([]);
    let navigate = useNavigate()
  let $api = axios.create({ baseURL: "https://api.anilibria.tv/v3/" });



    async function getSearchTitles() {
        let res = await $api.get('/title/search', {
            params: {
                search: search,
            }
        })
        let data = res.data
        setTitles(data.list)
        console.log(data);
        
    }
    useEffect(() => {
        getSearchTitles()
    },[search])
    function hundleClick(id) {
        navigate(`/watch/${id}`)
    }
    return (
        <div>
            <Header/>
            <div className="search">
            <input value={search} type="text" placeholder="поиск" onChange={(e) => setSearch(e.target.value)}/>
        </div>
        <div className="flex">
        {titles.map((e,i) => (
            <div className="product-item " key={e.i}>
                {console.log(e)}
                
                <img src={`https://static-libria.weekstorm.one${e.posters.original.url}`} alt="" />
                <div className="product-list">
                <h2>{e.names.ru}</h2>
                <button onClick={() => hundleClick(e.id)}>смотреть</button>
                </div>
            </div>
        ))}
        </div><br /><br />
        </div>
    );
}

export default Search;
