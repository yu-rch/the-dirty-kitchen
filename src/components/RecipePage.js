import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../RecipePageDesign.css';
import '../CommentSection.css';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const RecipePage = () => {

    const [categories, setCategories] = useState([]);
    const { idMeal } = useParams();
    const [recipe, setRecipe] = useState(null);

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
        setRecipe(null);
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
                const data = await response.json();
                setRecipe(data.meals ? data.meals[0] : null);
            } catch (error) {
                console.error('Error fetching recipe:', error);
                setRecipe(null);
            }
        };

        fetchRecipe();
    }, [idMeal]);

    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ username: '', comment: '' });
    const [loadError, setLoadError] = useState('');

    useEffect(() => {
        setPosts([]);
        setLoadError('');
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idMeal]);

    const fetchPosts = () => {
        axios.get(`${API_URL}/api/getComments`, { params: { idMeal } })
            .then((response) => {
                setPosts(response.data);
                setLoadError('');
            })
            .catch((error) => {
                console.log(error);
                setLoadError('Could not load comments. Make sure the backend server is running.');
            });
    };

    const handleCreatePost = () => {
        if (!newPost.comment.trim()) {
            alert('Please write a comment.');
            return;
        }
        axios.post(`${API_URL}/api/createComments`, { ...newPost, idMeal })
            .then(() => {
                fetchPosts();
                setNewPost({ username: '', comment: '' });
            })
            .catch((error) => {
                console.log(error);
                alert('Failed to post comment. Make sure the backend server is running.');
            });
    };

    if (!recipe) {
        return <div>Loading...</div>;
    }

    const ingredients = Object.keys(recipe)
        .filter(key => key.startsWith('strIngredient') && recipe[key])
        .map(key => recipe[key]);

    const instructions = (recipe.strInstructions || '').split(/\r?\n/).filter(line => line.trim() !== '');

    return (
        <div>
            <body className='body8'>
                <div className='navigation'>
                    <div className='logo8'></div>

                    <a href='/home'><button className='home'>Home</button></a>
                    <a href='/about'><button className='about'>About</button></a>
                    <a href='/contact'><button className='contact'>Contact</button></a>

                    <div className="dropdown8">
                        <button className="dropbtn8" onClick={() => window.location.href = '/recipes/all'}>
                            Categories
                        </button>
                        <div className="dropdown-content8">
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
                    <div className='divider8'></div>
                </div>

                <div
                    className='foodpic'
                    style={{
                        background: `url(${recipe.strMealThumb}) no-repeat center center`,
                        backgroundSize: 'cover',
                        width: '1266px',
                        height: '828px',
                        marginTop: '-800px',
                        marginLeft: '247px',
                    }}
                ></div>

                <div className='foodname-cont'>
                    <div className='header21'>{recipe.strMeal}</div>
                </div>

                <div className='e1'></div>

                <div className='ins-f'>
                    <div className='e2-cont'><p className='e2'>~{recipe.strMeal}~</p></div>
                    <p className='e3'>Ingredients:</p>
                    <div className='ing'>
                        <p className='e4'>
                            {ingredients.map((ingredient, index) => (
                                <label key={index}>
                                    <span>{ingredient}</span>
                                    <input type='checkbox' /><br />
                                </label>
                            ))}
                        </p>
                    </div>
                    <p className='e3'>Instructions:</p>
                    <ol className='instructions'>
                        {instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>

                    <div className='comments-cont'>
                        <p className='comments'>Join the conversation!</p>
                        <div className='divi'></div>

                        <div className='comment-form'>
                            <input
                                type='text'
                                className='comment-name-input'
                                placeholder='Your name (optional)'
                                value={newPost.username}
                                onChange={(e) => setNewPost({ ...newPost, username: e.target.value })}
                            />
                            <textarea
                                className='comment-body-input'
                                placeholder='Write a comment...'
                                value={newPost.comment}
                                onChange={(e) => setNewPost({ ...newPost, comment: e.target.value })}
                            />
                            <button className='comment-post-btn' onClick={handleCreatePost}>Post Comment</button>
                        </div>

                        {loadError && <p className='comment-error'>{loadError}</p>}

                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post._id} className='comment-item'>
                                    <div className='comment-item-top'>
                                        <span className='comment-username'>{post.username || 'Anonymous'}</span>
                                        <span className='comment-date'>{post.createdAt ? String(post.createdAt).slice(0, 16) : ''}</span>
                                    </div>
                                    <p className='comment-text'>{post.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p className='comment-empty'>No comments yet. Be the first to comment!</p>
                        )}
                    </div>

                    <div className='footer8'>
                        <div className='fbg8'></div>
                        <div className='circle8'></div>
                        <p className='ffffffff1'><b>c</b></p>
                        <p className='ffffffff2'><b>2024 The Dirty Kitchen. All rights reserved.</b></p>
                    </div>
                </div>

                <div className="filler8"></div>
            </body>
        </div>
    );
}

export default RecipePage;

