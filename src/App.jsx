import { useEffect, useState } from 'react'
import './App.css'

import { getPeople, getInfo } from './api';

function App() {

  const [people, setPeople] = useState([]);
  const [info, setInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const fetchGetPeople = async (page) => {
    try {
      const response = await getPeople(page);
      setPeople(response.results);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchGetPeople(1);
  }, [])

  const removeItem = (name) => {
    const newList = people.filter((item) => item.name !== name)
    setPeople(newList);
  }

  const fetchDetailInfo = async (url) => {
    try {
      const response = await getInfo(url);
      setInfo(response);
    } catch (error) {
      throw error;
    }
  }

  const goToPreviousPage = () => {
    if (currentPage === 1) return;

    setCurrentPage(currentPage => currentPage - 1);
  }

  const goToNextPage = () => {
    if (currentPage === 9) return;

    setCurrentPage(currentPage => currentPage + 1);
  }

  useEffect(() => {
    fetchGetPeople(currentPage);
  }, [currentPage])

  return (
    <>
      <div>
        <ul>
          {people.map((item, index) => {
            return <div key={item.name + index} style={{ display: 'flex' }}>
              <li style={{ cursor: 'pointer' }} onClick={() => fetchDetailInfo(item.url)}>{item.name}
              </li>
              <span style={{ marginLeft: 20, color: 'red', cursor: 'pointer' }} onClick={() => removeItem(item.name)}> x </span>
            </div>
          })}
        </ul>
        <div>
          <button onClick={() => goToPreviousPage()}> previous </button>
          <span style={{ marginLeft: 10, marginRight: 10 }}>{currentPage}</span>
          <button onClick={() => goToNextPage()}> next </button>
        </div>
        <div>
          <h3>Details</h3>
          <ul>
            <li>name: {info.name}</li>
            <li>skin: {info.skin_color}</li>
            <li>gender: {info.gender}</li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
