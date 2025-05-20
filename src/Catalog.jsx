import { logDOM } from '@testing-library/react';
import './App.css';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react'

import product_details_json from "./product_details.json";
console.log('Loaded product_details:', product_details_json);

export function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Memoize the filtered items so renderListing rerenders only when selectedCategory changes
  const filteredItems = useMemo(() => {
    return product_details_json.filter(item =>
      selectedCategory === "All" ||
      (item.title && item.title.toLowerCase().includes(selectedCategory.toLowerCase()))
    );
  }, [selectedCategory]);

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
  };

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
        <div className="py-4">
          <div className="d-flex justify-content-center align-items-center flex-column">
            {/* <div 
              className="mb-3"
              style={{
                width: 90,
                height: 90,
                background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(33,147,176,0.15)'
              }}
            >
              <img
                src="peachtree-logo.png"
                alt="Peachtree Logo"
                width="300"
                height="74"
                style={{ display: 'block' }}
              />
            </div> */}
            
            {/* <h1 className="text-center display-4 fw-bold" style={{letterSpacing: '2px', color: '#2193b0', textShadow: '0 2px 8px #6dd5ed55'}}>  */}
              <img
                src="main-logo.png"
                alt="Scraptops"
                width="1280"
                height="290"
                style={{ display: 'block' }}
              /> 
              {/* Scraptops</h1> */}
            <h2 className="text-center mt-3 mb-0" style={{ fontWeight: 400, color: '#2193b0', letterSpacing: '1px' }}>
              Your one-stop shop for laptop parts!
            </h2>
            <div className="text-center mt-2">
              <span className="badge rounded-pill bg-info text-dark fs-6 shadow-sm px-3 py-2" style={{background: 'linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)', opacity: 0.95}}>
                {/* Your one-stop shop for laptop parts */}
                <a
                  href="https://www.ebay.com/str/scraptops404?_trksid=p4429486.m3561.l161211"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  Visit our shop on eBay
                </a>
              </span>
            </div>
          {/* <div className="mt-3">
            <a
              href="https://www.ebay.com/str/scraptops404?_trksid=p4429486.m3561.l161211"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary"
              style={{ fontWeight: 500, letterSpacing: '1px' }}
            >
              Visit our shop on eBay
            </a>
          </div> */}
          </div>
        </div>

        <div className="d-flex justify-content-center my-4">
          {["All", "Motherboard", "Touchscreen", "Keyboard"].map((category) => (
            <button
              key={category}
              type="button"
              className={`btn mx-2 ${selectedCategory === category ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className=" mt-5">
          <div className="card-body">
            {renderListing(filteredItems)}
          </div>
        </div>

      </div>
    </div>
  );
  
};