import React from "react";


const BrewerySummary = props => (
  <div>
    <div className="text-left">
      <span><img src={props.icon}></img><h4>{props.name}</h4></span>
        <p>Rating: {props.rating}</p>
        <p>Category: {props.type}</p>
        <p>Price: {props.price}</p>
        <p>Total Reviews: {props.price}</p>
        <p>Open Now: {props.open_now}</p>
    </div>
      <div className="text-right">
        <p>{props.address}</p>
      </div>
    </div>
    );
    export default BrewerySummary;
