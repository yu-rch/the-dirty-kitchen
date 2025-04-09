import React, { useEffect, useState } from 'react';
import { Card, Col, Row  } from 'antd';
import '../SavoryDesign.css';

const { Meta } = Card;
const Savory = () => {

  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  const fetchRecipes = async (category) => {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        const data = await response.json();
        setRecipes(data.meals); // Set the recipes to state
        setSelectedCategory(category); // Track the selected category
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
  };


  

  return (
    <div>

      <body className='body3'>
      
      <div className='navigation'>
            <div className='logo4'></div>
            
            <a href='/home'><button className='home'>Home</button></a>

            <a href='/about'><button className='about'>About</button></a>

            <a href='/contact'><button className='contact'>Contact</button></a>
            
            <div class="dropdown4">
                <button class="dropbtn4">Recipes</button>
                <div class="dropdown-content4">
                    <a href="/recipes/all">All</a>
                    <a href="/recipes/savory">Savory</a>
                    <a href="/recipes/sweets">Sweets</a>
                    <a href="/recipes/beverages">Drinks/Beverages</a>
                </div>
            </div>

            <div className='divider4'></div>
        </div>

        <div className='headers4'>
            <div className='hbg7'></div>
            <div className='hbg8'></div>
            <input type='text' className='searchbar4' placeholder='Search a recipe'></input>
            <button className='searchbarbutton4'>SEARCH</button>
        </div>

        <p className='header13'>Recipes |</p>
        <p className='header14'>Savory</p>

        
        <div className='tab2'>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', flexDirection: 'row' }}>
                {categories.map(category => (
                    <Card
                        key={categories.idCategory}
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
                                alt={categories.strCategory}
                                src={categories.strCategoryThumb}
                            />
                        }
                    >
                        <Meta title={categories.strCategory}
                        style={{textAlign: 'center'}} />
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
                                cursor: 'pointer',
                            }}
                            onClick={() => fetchRecipes(category.strCategory.meals.idMeal)}
                        >
                            View
                        </button>
                    </Card>
                ))}
            </div>
        </div>

        {/* Display Recipes if a category is selected */}
        {selectedCategory && (
            <div>
                <h3>Recipes for {selectedCategory}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', flexDirection: 'row' }}>
                    {recipes ? recipes.map(recipe => (
                        <Card
                            key={recipe.idMeal}
                            hoverable
                            style={{ width: 200,
                              height: 240,
                              border: '2px solid #813a45',
                              borderRadius: '8px',
                              position: 'relative',
                              paddingTop: '20px' }}
                            cover={
                                <img
                                    height={100}
                                    width={100}
                                    alt={recipe.strMeal}
                                    src={recipe.strMealThumb}
                                />
                            }
                        >
                            <Meta title={recipe.strMeal} />
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
                                cursor: 'pointer',
                            }}
                            onClick={() => fetchRecipes(categories.strCategory)}
                        >
                            View Recipes
                        </button>
                        </Card>
                    )) : <p>No recipes found.</p>}
                </div>
            </div>
        )}

        <div className='footer4'>
          <div className='fbg4'></div>
            <div className='circle4'></div>
            <p className='ffff1'><b>c</b></p>
            <p className='ffff2'><b>2024 The Dirty Kitchen. All rights reserved.</b></p>
        </div>

        <div class="filler4"></div>

      </body>
      
    </div>
  )
}

export default Savory
