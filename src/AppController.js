import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LogIn from './components/LogIn'
import Home from './components/Home'
import About from './components/About'
import AllRecipes from './components/AllRecipes'
import Contact from './components/Contact'
import RecipePage from './components/RecipePage'
import RecipesInCategories from './components/RecipesInCategory'

const AppController = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LogIn/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/recipes/all' element={<AllRecipes/>}></Route>
        <Route path="/recipes/:categoryName" element={<RecipesInCategories/>} />
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path="/recipe/:idMeal" element={<RecipePage />} />
        </Routes>
    </Router>
  )
}

export default AppController
