import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css'
import Header from "./Header";



const Main = () => {
    let [titles, setTitles] = useState([]);
    let [day, setDay] = useState()
  let $api = axios.create({ baseURL: "https://api.anilibria.tv/v3/" });
  const navigate = useNavigate();

  const get = async () => {
    try {
      const res = await $api.get("/title/schedule");
      const data = res.data;

      const titlesArray = Object.values(data); 
      setTitles(titlesArray);
      console.log(data);
      
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }

    
  };
  useEffect(() => {
    get();
  }, []);
  console.log(titles[0]);
  function hundleClick(id) {
    navigate(`/watch/${id}`)
}
console.log(titles);



    return (
        
        <div className="data">
            <Header/>
            <div className="monday">
             <h1>ГРАФИК</h1>
             <ul>
                <li onClick={() => setDay(0)}>Понедельник</li>
                <li onClick={() => setDay(1)}>Вторник</li>
                <li onClick={() => setDay(2)}>Среда</li>
                <li onClick={() => setDay(3)}>Четверг</li>
                <li onClick={() => setDay(4)}>Пятница</li>
                <li onClick={() => setDay(5)}>Суббота</li>
                <li onClick={() => setDay(6)}>Воскресенье</li>
             </ul>
            {
                <div className="flex">
                   { titles.map((e) => (
                    // <div key={i}>
                    //     {console.log(e.list)}
                        
                    // </div>
                    
                    e.list.map(item => {
                        if (e.day === day) {
                            return (
                                <div className="product-item" key={item.id}> {/* Добавьте уникальный ключ для элементов */}
                                    <img src={`https://static-libria.weekstorm.one${item.posters.original.url}`} alt="" />
                                    <div className="product-list">
                                    <h2>{item.names.ru}</h2>
                                    <button onClick={() => hundleClick(item.id)}>смотреть</button>
                                    </div>
                                </div>
                            );
                        } else{
                            return null; // Если условие не выполнено, возвращаем null
                        }
                        
                    })
                    
                ))}
                </div>
            }
            </div><br /><br />
        </div>
    );
}

export default Main;
