import React, { useEffect, useState } from 'react'
import '../AboutDesign.css';

const About = () => {

    const sections = ['.a5', '.a1', '.a2', '.a3', '.a4'];
    const [sectionIndex, setSectionIndex] = useState(0);

    useEffect(() => {
        const handleScroll = (event) => {
            if (event.deltaY > 0 && sectionIndex < sections.length - 1) {
                setSectionIndex((prevIndex) => prevIndex + 1);
            } else if (event.deltaY < 0 && sectionIndex > 0) {
                setSectionIndex((prevIndex) => prevIndex - 1);
            }
        };

        window.addEventListener('wheel', handleScroll);
        
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [sectionIndex, sections]);

    useEffect(() => {
        document.querySelector(sections[sectionIndex]).scrollIntoView({ behavior: 'smooth' });
    }, [sectionIndex, sections]);


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

        <div className='a5'></div>

        <div className='d1'>
            <p className='header6'>The Dirty Kitchen</p>
            <p className='p1'><b>Welcome to The Dirty Kitchen!</b></p>
            <p className='p2'>
                Your go-to destination for all things delicious!
                Here, we celebrate the art of cooking with a little mess and 
                a lot of love.
            </p>
        </div>

        <div className='a1'>
            <div className='aa1'>
                <p className='header7'>Our Philosophy</p>
            </div>
            <div className='b1'></div>
            <p className='p3'>
                At The Dirty Kitchen, we believe that cooking should 
                be fun, spontaneous, and sometimes a little messy.
            </p>
            <p className='p4'>
                Whether you're a seasones chef or a curious beginner, our 
                recipes are designed to inspire creativity and enjoyment in the kitchen.
            </p>
        </div>

        <div className='a2'>
            <a href='/recipes/all'><button className='view1'>View our Recipes</button></a>
            <div className='aa2'>
                <p className='header8'>Our Recipes</p>
            </div>
            <div className='b2'></div>
            <p className='p5'>
                From quick weeknight dinners to elaborate weekend feasts, we've got a recipe 
                for every occasion.
            </p>
            <p className='p6'>
                Our dishes are crafted with a focus on bold flavors, fresh ingredients, 
                and a pinch of adventure. Dive into our collection and discover new favorites!
            </p>
        </div>

        <div className='a3'>
            <button className='view2'>Join now!</button>
            <div className='aa3'>
                <p className='header9'>Join the Community</p>
            </div>
            <div className='b3'></div>
            <p className='p7'>
                We encourage you to share your cooking experiences, tips, and even your own "dirty" kitchen stories. 
            </p>
            <p className='p8'>
                Join our community of passionate food lovers, and let's make cooking a joyful journey together.
            </p>
        </div>

        <div className='a4'>
            <a href='/contact'><button className='view3'>Send us a message!</button></a>
            <div className='aa4'>
                <p className='header10'>Get in Touch</p>
            </div>
            <div className='b4'></div>
            <p className='p9'>
                <b>We'd love to hear from you!</b>
            </p>
            <p className='p10'>
                Whether you have a question, a suggestion, or just want to 
                say hello, feel fress to reach out.
            </p>
            <p className='p11'>
                Together, let's celeberate the beautiful chaos of cooking!
            </p>
        </div>

        <div className='footer2'>
            <div className='fbg2'></div>
            <div className='circle2'></div>
            <p className='ff1'><b>c</b></p>
            <p className='ff2'><b>2024 The Dirty Kitchen. All rights reserved.</b></p>
        </div>

        <div class="filler2"></div>
      
    </div>
  )
}

export default About
