import React from 'react'
import '../BevDesign.css';

const Bev = () => {
  return (
    <div>

<body className='body6'>
      
      <div className='navigation'>
            <div className='logo6'></div>
            
            <a href='/home'><button className='home'>Home</button></a>

            <a href='/about'><button className='about'>About</button></a>

            <a href='/contact'><button className='contact'>Contact</button></a>
            
            <div class="dropdown6">
                <button class="dropbtn6">Recipes</button>
                <div class="dropdown-content6">
                    <a href="/recipes/all">All</a>
                    <a href="/recipes/savory">Savory</a>
                    <a href="/recipes/sweets">Sweets</a>
                    <a href="/recipes/beverages">Drinks/Beverages</a>
                </div>
            </div>

            <div className='divider6'></div>
        </div>

        <div className='headers6'>
            <div className='hbg11'></div>
            <div className='hbg12'></div>
            <input type='text' className='searchbar6' placeholder='Search a recipe'></input>
            <button className='searchbarbutton6'>SEARCH</button>
        </div>

        <p className='header17'>Recipes |</p>
        <p className='header18'>Beverages</p>

        <div className='tab4'>
            <div className='img4'></div>
            {/* <div className='img4' style={{backgroundImage: `url(${image})`}}></div> */}
            <p className='timelength4'>1 hr 45 mins</p>
            <p className='des4'>Whatever more info you need here. Food description or whatever. yuh yuh yuh</p>
            <a href='#' className='title4'>Mushroom Pizza</a>
        </div>

        <div className='footer6'>
          <div className='fbg6'></div>
            <div className='circle6'></div>
            <p className='ffffff1'><b>c</b></p>
            <p className='ffffff2'><b>2024 The Dirty Kitchen. All rights reserved.</b></p>
        </div>

        <div class="filler6"></div>

      </body>
      
    </div>
  )
}

export default Bev
