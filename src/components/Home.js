import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../HomeDesign.css';
import axios from 'axios';

const filterOn1 = () => {
    Array.from(document.getElementsByClassName('blurimg1')).forEach(elem => {
        elem.style.filter = 'blur(5px)';
    });
    Array.from(document.getElementsByClassName('fg1')).forEach(elem => {
        elem.style.visibility = 'visible';
    });
    Array.from(document.getElementsByClassName('fg2')).forEach(elem => {
        elem.style.visibility = 'visible';
    });
    Array.from(document.getElementsByClassName('gtr1')).forEach(elem => {
        elem.style.visibility = 'visible';
    });
};

const filterOff1 = () => {
    Array.from(document.getElementsByClassName('blurimg1')).forEach(elem => {
        elem.style.filter = 'none';
    });
    Array.from(document.getElementsByClassName('fg1')).forEach(elem => {
        elem.style.visibility = 'hidden';
    });
    Array.from(document.getElementsByClassName('fg2')).forEach(elem => {
        elem.style.visibility = 'hidden';
    });
    Array.from(document.getElementsByClassName('gtr1')).forEach(elem => {
        elem.style.visibility = 'hidden';
    });
};

const filterOn2 = () => {
    Array.from(document.getElementsByClassName('blurimg2')).forEach(elem => {
        elem.style.filter = 'blur(5px)';
    });
    Array.from(document.getElementsByClassName('fg3')).forEach(elem => {
        elem.style.visibility = 'visible';
    });
    Array.from(document.getElementsByClassName('fg4')).forEach(elem => {
        elem.style.visibility = 'visible';
    });
    Array.from(document.getElementsByClassName('gtr2')).forEach(elem => {
        elem.style.visibility = 'visible';
    });
};

const filterOff2 = () => {
    Array.from(document.getElementsByClassName('blurimg2')).forEach(elem => {
        elem.style.filter = 'none';
    });
    Array.from(document.getElementsByClassName('fg3')).forEach(elem => {
        elem.style.visibility = 'hidden';
    });
    Array.from(document.getElementsByClassName('fg4')).forEach(elem => {
        elem.style.visibility = 'hidden';
    });
    Array.from(document.getElementsByClassName('gtr2')).forEach(elem => {
        elem.style.visibility = 'hidden';
    });
};

const filterOn3 = () => {
    Array.from(document.getElementsByClassName('blurimg3')).forEach(elem => {
        elem.style.filter = 'blur(5px)';
    });
    Array.from(document.getElementsByClassName('fg5')).forEach(elem => {
        elem.style.visibility = 'visible';
    });
    Array.from(document.getElementsByClassName('fg6')).forEach(elem => {
        elem.style.visibility = 'visible';
    });
    Array.from(document.getElementsByClassName('gtr3')).forEach(elem => {
        elem.style.visibility = 'visible';
    });
};

const filterOff3 = () => {
    Array.from(document.getElementsByClassName('blurimg3')).forEach(elem => {
        elem.style.filter = 'none';
    });
    Array.from(document.getElementsByClassName('fg5')).forEach(elem => {
        elem.style.visibility = 'hidden';
    });
    Array.from(document.getElementsByClassName('fg6')).forEach(elem => {
        elem.style.visibility = 'hidden';
    });
    Array.from(document.getElementsByClassName('gtr3')).forEach(elem => {
        elem.style.visibility = 'hidden';
    });
};


const Home = () => {
// FOR DROP DOWN
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

        <div className='headers1'>
            <div className='hbg1'></div>
            <div className='hbg2'></div>
            <input type='text' className='searchbar1' placeholder='Search a recipe'
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            ></input>
            <button className='searchbarbutton1'>SEARCH</button>
            {mealName && allMeals.length > 0 && (
                <div className='dropdown'>
                    <ol>
                        {allMeals.map((meal) => (
                            <li key={meal.idMeal}>
                                <Link to={`/recipe/${meal.idMeal}`} className='search-items'>{meal.strMeal}</Link>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </div>

        <p className='header1'>Home</p>
        <p className='header2'>Home</p>

        <div className='motd'>
            <div className='bg1'></div>
                <div className='pic1' onMouseOver={filterOn1} onMouseOut={filterOff1}>
                <div className='blurimg1'></div>
                <div className='fg1'>Garlic Butter</div>
                <div className='fg2'>Chicken</div>
                <a href='#' className='gtr1'>Go to recipe</a>
            </div>
            <p className='text1'>Meal</p>
            <p className='text2'>of the Day</p>
        </div>

        <div className='dotd'>
            <div className='bg2'></div>
            <div className='pic2' onMouseOver={filterOn2} onMouseOut={filterOff2}>
                <div className='blurimg2'></div>
                <div className='fg3'>Strawberry</div>
                <div className='fg4'>Shortcake</div>
                <a href='#' className='gtr2'>Go to recipe</a>
            </div>
            <p className='text3'>Dessert</p>
            <p className='text4'>of the Day</p>
        </div>

        <div className='wn'>
            <div className='bg3'></div>
            <div className='pic3' onMouseOver={filterOn3} onMouseOut={filterOff3}>
                <div className='blurimg3'></div>
                <div className='fg5'>Mushroom</div>
                <div className='fg6'>Pizza</div>
                <a href='#' className='gtr3'>Go to recipe</a>
            </div>
            <p className='text5'>NEW</p>
            <p className='text6'>NEW</p>
            <p className='text7'>RECIPE</p>
            <p className='text8'>RECIPE</p>
        </div>

        <p className='text9'>Highlights</p>
        <p className='text10'>Highlights</p>

        <div class="gradient"></div>
        <p className='header3'>The Dirty Kitchen</p>

        <div className='footer1'>
            <div className='fbg1'></div>
            <div className='circle1'></div>
            <p className='f1'><b>c</b></p>
            <p className='f2'><b>2024 The Dirty Kitchen. All rights reserved.</b></p>
        </div>

        <div class="filler1"></div> 
      
    </div>
  )
}

export default Home
