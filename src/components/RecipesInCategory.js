import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
import '../SavoryDesign.css';
import { Link } from 'react-router-dom';


const { Meta } = Card;

const RecipesInCategories = () => {

    const [categories, setCategories] = useState([]);
    const { categoryName } = useParams(); 
    const [recipes, setRecipes] = useState([]);

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

    useEffect(() => {
        if (!categories.length) return;
        const resolved = categories.find(c => c.strCategory.toLowerCase() === categoryName);
        const query = resolved ? resolved.strCategory : categoryName;
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`);
                const data = await response.json();
                setRecipes(data.meals || []);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };

        fetchRecipes();
    }, [categories, categoryName]);

    return (
        <div>
            <body className='body3'>
                <div className='navigation'>
                    <div className='logo4'></div>
                    
                    <a href='/home'><button className='home'>Home</button></a>

                    <a href='/about'><button className='about'>About</button></a>

                    <a href='/contact'><button className='contact'>Contact</button></a>
                    
                    <div className="dropdown4">
                        <button className="dropbtn4" onClick={() => window.location.href = '/recipes/all'}>
                        Categories
                        </button>
                        <div className="dropdown-content4">
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

                    <div className='divider4'></div>
                </div>

            <div className='headers4'>
                <div className='hbg7'></div>
                <div className='hbg8'></div>
                <input type='text' className='searchbar4' placeholder='Search a recipe'></input>
                <button className='searchbarbutton4'>SEARCH</button>
            </div>

            <p className='header13'>Recipes |</p>
            <p className='header14'>{categories.find(c => c.strCategory.toLowerCase() === categoryName)?.strCategory || categoryName}</p>
             
            <div className='cnf'>
            <div className='tab2'>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {recipes.map(recipe => (
                        <Card
                            key={recipe.idMeal}
                            hoverable
                            style={{ width: 200,
                              height: 290,
                              border: '2px solid #813a45',
                              borderRadius: '8px',
                              position: 'relative',
                              paddingTop: '20px' }}
                            cover={<img  
                                height={150}
                                width={90}
                                alt={recipe.strMeal}
                                src={recipe.strMealThumb} />}
                        >
                            <Meta title={recipe.strMeal} style={{textAlign: 'center'}} />
                            <Link to={`/recipe/${recipe.idMeal}`}>
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
                                >
                                    View Recipe
                                </button>
                            </Link>
                        </Card>
                    ))}
                </div>
            </div>

                <div className='footer4'>
                <div className='fbg4'></div>
                    <div className='circle4'></div>
                    <p className='ffff1'><b>c</b></p>
                    <p className='ffff2'><b>2024 The Dirty Kitchen. All rights reserved.</b></p>
                </div>
            </div>

                <div className="filler4"></div>
            </body>
        </div>
    );
};

export default RecipesInCategories;
