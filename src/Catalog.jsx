import { logDOM } from '@testing-library/react';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'


import product_details_json from "./product_details.json";
console.log('Loaded product_details:', product_details_json);


export function Catalog() {
  const renderListing = (items) => {
        return (
        <div className="container">
          <div className="row">
            {items.map((item, idx) => (
              <div className="col-md-4 mb-4" key={item.item_number || idx}>
                <div className="card h-100">
                  <a
                    href={`https://www.ebay.com/itm/${item.item_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={item['img_url']}
                      className="card-img-top"
                      alt={item['title']}
                      style={{ objectFit: 'contain', maxHeight: '250px', background: '#f8f9fa' }}
                    />
                  </a>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item['title']}</h5>
                    <p className="card-text mt-auto">
                      {item['price_currency'] === 'USD' ? '$' : item['price_currency']}
                      {item['price']}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        );

    }



  // const tileContent = ({ date, view }) => {
  //   if (view === 'month') {
  //     const formattedDate = date.toISOString().split('T')[0];
  //     if (selectedBuilding && selectedBuilding.building_scans.some(scan => scan.scan_date === formattedDate)) {
  //       // return (
  //       //   <div style={{ backgroundColor: '#ffa', borderRadius: '50%', padding: '5px', textAlign: 'center' }}>
  //       //     {/* {date.getDate()} */}
  //       //   </div>
  //       // );
  //     }
  //   }
  //   return null;
  // };


  return (

    <div className='App-header'>
      <div className="container">
        

        <div class=" mt-5">
          <div class="card-body">
            { renderListing(product_details_json) }
          </div>
        </div>

      </div>
    </div>
  );
  
};