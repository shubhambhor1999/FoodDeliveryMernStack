import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Cards from '../components/Cards'
import Spinner from '../components/Spinner';
// import Carousel from '../components/Carousel'

export default function Home() {

  const [foodItem, setFoodItem] = useState([]);
  const [foodCat, setFoodCat] = useState([]);
  const [search,setSearch]=useState('');
  const [loading,setLoading]=useState(false);
  const loadData = async () => {
    let response = await fetch("https://food-delivery-six-khaki.vercel.app/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': `application/json`
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    setLoading(true);
  }

  useEffect(() => {
    loadData()
    .catch((error)=>{
      console.log(error);
      setLoading(false);
    })
  }, [])
  return (
<>
    {
      !loading ? <Spinner/>:
      <>
    <div>
      <div><Header /></div>
      <div>
<div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
    
    <div className="carousel-inner" id="carousel">
    <div className='carousel-caption' style={{zIndex:"10"}}>
    <div className="d-flex justify-content-center">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
      {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
    </div>
    </div>
      <div className="carousel-item active">
        <img src="https://source.unsplash.com/random/900×100/?burger" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900×100/?pizza" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
      </div>
      <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900×100/?barbeque" className="d-block w-100" style={{filter:"brightness(30%)"}} alt="..."/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  </div>
      <div className='container'>
        {
          (foodCat.length > 0)
            ? foodCat.map(data => {
              return ( 
              <div className='row mb-3'><div key={data._id} className='fs-3 m-3'>
              {data.CategoryName}
              </div>
              <hr/>
              {
                foodItem.length > 0 ? 
                foodItem.filter((item)=>(item.CategoryName===data.CategoryName)  && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                .map(filterItems =>{
                  return <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                    <Cards FoodItem={filterItems}
                      options={filterItems.options[0]}
                    />
                  </div>
                }
                ):<div>No such datafound</div>
              }

              </div>
            )
            }) : ""

        }

      </div>
      <div><Footer /></div>
    </div>
    </>}
    </>
  )
}
