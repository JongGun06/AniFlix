import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import '../App.css'
import Header from "./Header";



const Catalog = () => {
  let [titles, setTitles] = useState([]);
  let [activePage, setActivePage] = useState(1);
  let [pagination, setPagination] = useState();
  let $api = axios.create({ baseURL: "https://api.anilibria.tv/v3/" });
  const navigate = useNavigate();

  const get = async () => {
    try {
        const res = await $api.get("/v3/title/updates", {
            params: {
              playlist_type: "array",
              page: activePage,
              items_per_page: 8
            },
          });
          const data = res.data;

      setTitles(data.list);
      setPagination(data.pagination);
    
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };
  useEffect(() => {
    get();
  }, [activePage]);
  
  console.log(titles);
      console.log(pagination);
  const onChange = (page) => {
    console.log(page);
    setActivePage(page);
  };
  function hundleClick(id) {
    navigate(`/watch/${id}`)
}
  return (
    <div>
        <Header/>
        <div className="flex">
            {titles && titles.map(title => (
                <div className="product-item" key={title.id}>
                    <img src={`https://static-libria.weekstorm.one${title.posters.original.url}`} alt="" />
                   <div className="product-list">
                   <h3>{title.names.ru}</h3>
                   <button className="button" onClick={() => hundleClick(title.id)}>смотреть</button>
                   </div>
                </div>
            ))}
        </div>
      <div className="page">
      <Pagination
        defaultCurrent={1}
        onChange={onChange}
        current={activePage}
        total={pagination?.pages}
        showSizeChanger={false}
      />
      </div>
      <br /><br />
    </div>
  );
};

export default Catalog;
