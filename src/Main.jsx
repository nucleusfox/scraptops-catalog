import { logDOM } from '@testing-library/react';
import './App.css';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react'
import { useLocation } from 'react-router-dom';

import product_details_json from "./product_details.json";
console.log('Loaded product_details:', product_details_json);

// Parse unique categories from product_details_json['eBay category 1 name']
const productCategories = ["All", ...Array.from(
  new Set(
    product_details_json
      .map(item => item['eBay category 1 name'])
      .filter(Boolean)
  )
)];

const toCamelCase = (word) => {
  if (word.length == 0) {
    return word;
  }
  if (word.charAt(0) == '#') {
    word = word.slice(1).toLowerCase();
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function Main() {
  // Parse URL
  const location = useLocation();
  const searchQuery  = location.search;
  console.log('location:', location);
  console.log('searchQuery:', searchQuery);


  // Main menu
  const MenuItems = ["Home", "Products", "About", "Contacts"];
  // if location.hash && location.hash.charAt(0) == '#'
  const urlMenuItem = toCamelCase(location.hash) || MenuItems[0];
  console.log('Identified hash menu item:', urlMenuItem);
  
  const [selectedMenuItem, setSelectedMenuItem] = useState(toCamelCase(location.hash) || MenuItems[0]);
  
  // Product Categories
  const [selectedCategory, setSelectedCategory] = useState(productCategories[0]);

  const filteredItems = useMemo(() => {
    return product_details_json.filter(item =>
      selectedCategory === "All" ||
      // (item.title && item.title.toLowerCase().includes(selectedCategory.toLowerCase()))
      item['eBay category 1 name'].toLowerCase().includes(selectedCategory.toLowerCase())
    );
  }, [selectedCategory]);

  // Add these new state variables after other useState declarations
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items to show per page

  // Add this pagination calculation
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  // Add this pagination controls component
  const PaginationControls = () => {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    
    return (
      <div className="d-flex justify-content-center align-items-center gap-2 my-4">
        <button
          className="btn" // btn-outline-primary"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ 
            borderColor: 'transparent', //'#2193b0', 
            color: '#2193b0'
          }}
        >
          ◀
        </button>
        <span className="mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="btn" // btn-outline-primary"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            borderColor: 'transparent', //'#2193b0', 
            color: '#2193b0'
          }}
        >
          ▶
        </button>
      </div>
    );
  };

  // Home
  const renderTabHome = () => {
    window.location.replace('#home');

    return (
      <div className="container">
        <h2>Welcome to scraptops.com...</h2>
        <p>Thank you for visiting our site.  We specialize in providing a one-stop shop for laptop parts and accessories.</p>
        <p>Our inventory can be viewed and purchased through our <a href="https://www.ebay.com/str/scraptops404?_trksid=p4429486.m3561.l161211" target="_blank" rel="noopener noreferrer">eBay store</a>, or we can provide you with information on laptop parts and accessories via email.</p>
        <p>You can reach us at info@scraptops.com.  We would be pleased to hear from you!  Please let us know what your needs and questions are, and we will be more than happy to help.</p>
      </div>
    );
  }

  // Catalog
  const renderTabProducts = () => {
    window.location.replace('#products');

    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <div style={{ 
            display: 'flex', 
            flexFlow: 'row wrap', 
            gap: '0.5rem',
            justifyContent: 'center'
          }}>
            {productCategories.map((category) => (
              <button
                key={category}
                type="button"
                style={{ 
                  borderColor: '#2193b0', 
                  color: selectedCategory === category ? 'white' : '#2193b0',
                  backgroundColor: selectedCategory === category ? '#2193b0' : 'transparent',
                  flex: '0 1 auto'
                }}
                className={`btn ${selectedCategory === category ? "btn-primary" : "btn-outline-primary"}`}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1); // Reset to first page when category changes
                  return false;
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="card-body">
            <div className="container">
              {/* Add pagination controls at the top */}
              <PaginationControls />
              
              <div className="row">
                {paginatedItems.map((item, idx) => (
                  <div className="col-md-4 mb-4" key={item.item_number || idx}>
                    <div
                      className="card h-100"
                      style={{
                        border: 'none',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        padding: '1rem 1rem 0 1rem'
                      }}>
                      <a
                        href={`https://www.ebay.com/itm/${item.item_number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={item['img_url']}
                          className="card-img-top"
                          alt={item['title']}
                          style={{ 
                            objectFit: 'contain', 
                            maxHeight: '250px', 
                            background: '#f8f9fa'
                          }}
                        />
                      </a>
                      <a
                        href={`https://www.ebay.com/itm/${item.item_number}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: '#2193b0' }}
                      >
                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title">{item['title']}</h5>
                          <p className="card-text mt-auto">
                            {item['price_currency'] === 'USD' ? 'USD $' : item['price_currency']}
                            {item['price']}
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add pagination controls at the bottom */}
              <PaginationControls />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // About
  const renderTabAbout = () => {
    window.location.replace('#about');

    return (
      <div className="container">
        <h2>About</h2>
        <p>We sell laptop parts for all major brands and models.  We specialize in having a large selection.  As always, some parts are in higher demand, while some older parts are more abundant.  Feel free to contact us in search of any parts or laptop accessories, or to request a price.</p>
      </div>
    );
  };

  // Contacts
  const renderTabContacts = () => {
    window.location.replace('#contacts');

    return (
      <div className="container">
        <h2>Contacts</h2>
        <p>Cool dudes ya know</p>
      </div>
    );
  };
  
  return (
    <div className='App-header'>
      <div className="container pt-5 pb-5" style={{ maxWidth: '95%' }}>
        <div className="" style={{ backgroundColor: '#f8f9fa', boxShadow: '0px 0px 20px 2px rgba(20, 80, 100, 0.2)', padding: '2rem', borderRadius: '10px'  }}>
          
          <div className="d-flex justify-content-center align-items-center flex-column">              
              {/* <h1 className="text-center display-4 fw-bold" style={{letterSpacing: '2px', color: '#2193b0', textShadow: '0 2px 8px #6dd5ed55'}}>  */}
                <img
                  src="main-logo.png"
                  alt="Scraptops"
                  // width="1280"
                  // height="290"
                  width="100%"
                  height="auto"
                  style={{ display: 'block', borderRadius: '0px' }}
                /> 
                {/* Scraptops</h1> */}
          </div>
          <div className="row pt-1">
            <div className="text-center mt-3">
              <h2 className="text-center mt-3 mb-0" style={{ fontWeight: 400, color: '#2193b0', letterSpacing: '1px', padding: '0 40px' }}>
                Your one-stop shop for laptop parts!
                <span style={{ marginRight: '20px' }}></span>
                <a
                  href="https://www.ebay.com/str/scraptops404?_trksid=p4429486.m3561.l161211"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg px-4 py-2"
                  style={{
                    // background: 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)',
                    background: '#2193b0',
                    // border: 'none',
                    border: '#2193b0',
                    color: 'white',
                    fontWeight: 500,
                    letterSpacing: '0.5px',
                    boxShadow: '0 4px 10px rgb(33, 147, 176, 0.1)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    borderRadius: '25px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(33,147,176,0.7)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(33,147,176,0.7)';
                  }}
                >
                  Visit our eBay Store
                </a>
              </h2>
            </div>
          </div>

          <div className="row pt-5">
            <div className="col-md-2">
              <div className="list-group mb-4">
                {MenuItems.map((item) => (
                  <button
                    key={item}
                    className={`list-group-item list-group-item-action ${
                      selectedMenuItem === item ? 'active' : ''
                    }`}
                    onClick={() => {
                      setSelectedMenuItem(item)
                      return false
                    }}
                    style={{
                      background: selectedMenuItem === item 
                        ? 'linear-gradient(135deg, #6dd5ed 0%, #2193b0 100%)'
                        : 'white',
                      border: '1px solid #e9ecef',
                      color: selectedMenuItem === item ? 'white' : '#2193b0',
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      transition: 'all 0.3s ease',
                      textAlign: 'left',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      marginBottom: '5px'
                    }}
                    onMouseOver={(e) => {
                      if (selectedMenuItem !== item) {
                        e.currentTarget.style.background = '#f8f9fa';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedMenuItem !== item) {
                        e.currentTarget.style.background = 'white';
                      }
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-md-10">
              {selectedMenuItem === 'Home' && renderTabHome()}
              {selectedMenuItem === 'Products' && renderTabProducts()}
              {selectedMenuItem === 'About' && renderTabAbout()}
              {selectedMenuItem === 'Contacts' && renderTabContacts()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};