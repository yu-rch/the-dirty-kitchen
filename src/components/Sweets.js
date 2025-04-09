import React from 'react'
import '../SweetsDesign.css';

const Sweets = () => {
  return (
    <div>

<body className='body3'>
      
      <div className='navigation'>
            <div className='logo5'></div>
            
            <a href='/home'><button className='home'>Home</button></a>

            <a href='/about'><button className='about'>About</button></a>

            <a href='/contact'><button className='contact'>Contact</button></a>
            
            <div class="dropdown5">
                <button class="dropbtn5">Recipes</button>
                <div class="dropdown-content5">
                    <a href="/recipes/all">All</a>
                    <a href="/recipes/savory">Savory</a>
                    <a href="/recipes/sweets">Sweets</a>
                    <a href="/recipes/beverages">Drinks/Beverages</a>
                </div>
            </div>

            <div className='divider5'></div>
        </div>

        <div className='headers5'>
            <div className='hbg9'></div>
            <div className='hbg10'></div>
            <input type='text' className='searchbar5' placeholder='Search a recipe'></input>
            <button className='searchbarbutton5'>SEARCH</button>
        </div>

        <p className='header15'>Recipes |</p>
        <p className='header16'>Sweets</p>

        <div className='tab3'>
            <div className='img3'></div>
            {/* <div className='img3' style={{backgroundImage: `url(${image})`}}></div> */}
            <p className='timelength3'>1 hr 45 mins</p>
            <p className='des3'>Whatever more info you need here. Food description or whatever. yuh yuh yuh</p>
            <a href='#' className='title3'>Mushroom Pizza</a>
        </div>

        <div className='footer5'>
          <div className='fbg5'></div>
            <div className='circle5'></div>
            <p className='fffff1'><b>c</b></p>
            <p className='fffff2'><b>2024 The Dirty Kitchen. All rights reserved.</b></p>
        </div>

        <div class="filler5"></div>

      </body>
      
    </div>
  )
}

export default Sweets
