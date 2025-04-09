import '../AllRecipesDesign.css';
import { Card, Col, Row  } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const { Meta } = Card;
const AllRecipes = () => {

  const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);


    const [allMeals, setAllMeals] = useState([]); 
    const [mealName, setMealName] = useState(''); 
    const [num, setNum] = useState(); 
    useEffect(() => {
        const fetchMeals = async () => {
            if (!mealName) {
                setAllMeals([]);
                return;
            }

            try {
                const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
                if (response.data.meals) {
                    setAllMeals(response.data.meals.slice(0, num));
                } else {
                    setAllMeals([]);
                }
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        };

        fetchMeals();
    }, [mealName, num]);

  


  return (
    <div>

        <div className='navigation'>
            <div className='logo'></div>
            
            <a href='/home'><button className='home'>Home</button></a>

            <a href='/about'><button className='about'>About</button></a>

            <a href='/contact'><button className='contact'>Contact</button></a>
            
            <div className="dropdown1">
                <button className="dropbtn1" onClick={() => window.location.href = '/recipes/all'}>
                    Categories
                </button>
                <div className="dropdown-content1">
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <a key={category.idCategory} href={`/recipes/${category.strCategory.toLowerCase()}`}>
                                {category.strCategory}
                            </a>
                        ))
                    ) : (
                        <span>No categories available</span>
                    )}
                </div>
            </div>

            <div className='divider1'></div>
        </div>

        <p className='header11'>Recipes |</p>
        <p className='header12'>All</p>
        

        <div className='tab1'>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', flexDirection: 'row' }}>
          {categories.map(category => (
              <Card
                  key={category.idCategory}
                  hoverable
                  style={{
                      width: 200,
                      height: 240,
                      border: '2px solid #813a45',
                      borderRadius: '8px',
                      position: 'relative',
                      paddingTop: '20px'
                  }}
                  cover={
                      <img
                          height={100}
                          width={100}
                          alt={category.strCategory}
                          src={category.strCategoryThumb}
                      />
                  }
              >
                  <Meta title={category.strCategory} 
                  style={{textAlign: 'center'}}/>

                   <Link to={`/recipes/${category.strCategory.toLowerCase()}`}>
                  <button
                      style={{
                          position: 'absolute',
                          bottom: '10px', 
                          left: '10px',
                          right: '10px',
                          backgroundColor: '#813a45',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '10px',
                          cursor: 'pointer'
                      }}
                      onClick={() => {
                          window.location.href = `/recipes/${category.strCategory.toLowerCase()}`;
                      }}
                  >
                      View Recipes in Category
                  </button>
                  </Link>
              </Card>
          ))}
          </div>
        </div>

        <div className='headers3'>
            <div className='hbg5'></div>
            <div className='hbg6'></div>
            <input type='text' className='searchbar3' placeholder='Search a recipe'
            value={mealName}
            onChange={(e) => setMealName(e.target.value)} 
            ></input>
            <button className='searchbarbutton3'>SEARCH</button>

            {mealName && allMeals.length > 0 && (
                    <div className='dropdown'>
                        <ol>
                            {allMeals.map((meal) => (
                                <li key={meal.idMeal}>
                                    <Link to={`/meal/${meal.idMeal}`} className='search-items'>{meal.strMeal}</Link>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}


        </div>

        <div className='footer3'>
          <div className='fbg3'></div>
            <div className='circle3'></div>
            <p className='fff1'><b>c</b></p>
            <p className='fff2'><b>2024 The Dirty Kitchen. All rights reserved.</b></p>
        </div>

        <div class="filler3"></div>

    </div>
  )
}
export default AllRecipes