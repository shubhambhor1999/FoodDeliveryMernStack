import React,{useEffect, useRef, useState} from 'react'
import { useDispatchCart,useCart } from './ConReducer';

export default function Cards(props) {
  let dispatch= useDispatchCart();
  let options=props.options;
  let data=useCart()
  let priceOptions=Object.keys(options);

  const priceRef=useRef();
  const [qty,setQty]=useState(1);
  const [size,setSize]=useState("");


  const handleCart=async ()=>{

    let food=[]
    for(const item of data)
    {
      if(item.id===props.FoodItem._id &&item.size===size)
      {
        food=item;
        break;
      }
    }
    if(food!=[])
    {
      if(food.size === size)
      {
        await dispatch({
          type:"UPDATE",
          id:props.FoodItem._id,
          price:finalPrice,
          qty:qty,
          size:size
        })
        return 
      }
      else if(food.size !== size)
      {
        await dispatch({
          type:"ADD",
          id:props.FoodItem._id,
          name:props.FoodItem.name,
          price:finalPrice,
          qty:qty,
          size:size
        })
        return
      }
      return
    }
      await dispatch({
        type:"ADD",
        id:props.FoodItem._id,
        name:props.FoodItem.name,
        price:finalPrice,
        qty:qty,
        size:size
      })
    
  }

  let finalPrice=qty*parseInt(options[size])
  useEffect(()=>{
    setSize(priceRef.current.value)
  },[])
  return (
    <div>
    <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
      <img src={props.FoodItem.img} className="card-img-top" alt="..." style={{height :"130px",objectFit:"fill"}} />
      <div className="card-body">
        <h5 className="card-title">{props.FoodItem.name}</h5>
        <div className='container w-100'>
          <select className='m-2 h-100 bg-success rounded' onChange={(e)=>setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => {
              return (<option key={i + 1} value={i + 1}>{i + 1}</option>);
            })}
          </select>
          <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
            {
              priceOptions.map((data)=>
              {
                return <option key={data} value={data}>{data}</option>
              })
            }
          </select>
          <div className='d-inline h-100 fs-5'>{finalPrice}/-</div>
          <hr/>
          <button className="btn btn-success justify-center ms-2" onClick={handleCart}>Add to Cart</button>
        </div>
      </div>
    </div></div>
  )
}
