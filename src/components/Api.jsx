import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoPlayer from "../VideoPlayer";
import { useParams } from "react-router-dom";
import "../App.css";
import Header from "./Header";

const Api = () => {
  let [titles, setTitles] = useState([]);
  let [selectedOption, setSelectedOption] = useState();
  let $api = axios.create({ baseURL: "https://api.anilibria.tv/v3/" });

  const { id } = useParams();

  const get = async () => {
    try {
      let res = await $api(`/v3/title?id=${id}`);
      const data = res;

      const titlesArray = Object.values(data); // Преобразуем объект в массив
      setTitles(titlesArray);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };
  useEffect(() => {
    get();
  }, []);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    console.log("Выбрано значение:", selectedValue); // Вывод выбранного значения в консоль
  };

  console.log(titles);

  return (
    <div>
      <Header />
      <div className="container color">
        {titles.map((item, i) =>
          item.posters && item.posters.original && item.posters.original.url ? (
            <div className="info" key={i}>
              <img
                src={`https://static-libria.weekstorm.one${item.posters.original.url}`}
                alt=""
              />
              <div className="info2">
                <h2>{item.names.ru}</h2>
                <p>{item.description}</p>
              </div>
            </div>
          ) : (
            <div></div>
          )
        )}

        <div className="select-container" style={{ display: "flex" }}>
          <select style={{background: '#767676'}} onChange={handleSelectChange}>
            <option value="disable" disabled selected>
              Выбрать серию
            </option>
            {titles.map((item, idx) =>
              item.player && item.player.episodes ? (
                [...Array(item.player.episodes.last).keys()].map((num) => (
                  <option key={num} value={num + 1}>
                    {num + 1}
                  </option>
                ))
              ) : (
                <div></div>
              )
            )}
          </select>
        </div><br />

        {titles.map((e, index) => (
          <div className="pleer" key={index}>
            {/* Проверяем наличие `e.player` и `e.player.list`, чтобы избежать ошибок */}
            {e.player &&
            e.player.list &&
            e.player.list[selectedOption || 1] &&
            e.player.list[selectedOption || 1].hls &&
            e.player.list[selectedOption || 1].hls.hd ? (
              <div>
                {console.log(e.player)}
                <VideoPlayer
                  url={`https://cache.libria.fun${
                    e.player.list[selectedOption || 1].hls.sd
                  }`}
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
      </div><br /><br />
    </div>
  );
};

export default Api;
