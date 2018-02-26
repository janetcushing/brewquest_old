import React from "react";


const BrewerySummary = props => (
  <div>
  <div className="text-left">
   <h4>{props.name}</h4>
    <p>{props.type}</p>
    </div>
    <div className="text-right">
    <p>{props.street}</p>
    <p>{props.city}, {props.st}</p>
    <p>{props.postalCode}</p>
    <p>{props.phone}</p>
  </div>
  </div>
);
export default BrewerySummary;
