import React, { useEffect, useState } from 'react';
import '../ContactDesign.css';

const Contact = () => {

  const [text, setText] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');


  const handleChange = (event) => {
      setText(event.target.value);
      const { name, value } = event.target;
      if (name === 'name') setName(value);
      if (name === 'email') setEmail(value);
      if (name === 'message') setMessage(value);
  };

  const clearForm = () => {
    setMessage('');
    setEmail('');
    setName('');
  }    

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

<body className='body7'>
      
      <div className='navigation'>
            <div className='logo7'></div>
            
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
                        <span>No categories available</span> // Fallback if no categories
                    )}
                </div>
            </div>

            <div className='divider7'></div>
        </div>

        <div className='headers7'>
            <div className='hbg13'></div>
            <div className='hbg14'></div>
            <input type='text' className='searchbar7' placeholder='Search a recipe'></input>
            <button className='searchbarbutton7'>SEARCH</button>
        </div>

        <div className='header19'>
            C<br/>
            O<br/>
            N<br/>
            T<br/>
            A<br/>
            C<br/>
            T
        </div>
        <div className='header20'>
            C<br/>
            O<br/>
            N<br/>
            T<br/>
            A<br/>
            C<br/>
            T
        </div>

        <div className='icons'>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <button className='fb'></button>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <button className='ig'></button>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <button className='tw'></button>
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noopener noreferrer">
              <button className='pin'></button>
          </a>
          <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
              <button className='tt'></button>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <button className='yt'></button>
          </a>
      </div>


        <div className='email-wrapper'>
          <label className='name'>Name: <input value={name} className='tf1'></input></label>
          <label className='email'>Email: <input value={email} className='tf2'></input></label>
          <label className='message'>Message: </label>
          <textarea value={message} className='tf3' 
            placeholder='Enter your message here'
            rows={10}
            cols={70}
            onChange={handleChange}/>
          <div className='btn-cont'>
            <button className='clearbtn' onClick={clearForm}>Clear</button>
            <button className='submitbtn'>Submit</button>
          </div>
        </div>

        <div className='footer7'>
          <div className='fbg7'></div>
            <div className='circle7'></div>
            <p className='fffffff1'><b>c</b></p>
            <p className='fffffff2'><b>2024 The Dirty Kitchen. All rights reserved.</b></p>
        </div>

        <div class="filler7"></div>

      </body>
      
    </div>
  )
}

export default Contact
