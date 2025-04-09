import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../RecipePageDesign.css';
import axios from 'axios';
const RecipePage = () => {

    const [categories, setCategories] = useState([]);
    const { idMeal } = useParams(); // Get the recipe ID from the URL
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
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
                const data = await response.json();
                setRecipe(data.meals[0]); // Set the fetched recipe
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        fetchRecipe();
    }, [idMeal]);

    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ username: '', comment: '' });
    const [editPost, setEditPost] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        axios.get("http://localhost:8000/api/getComments")
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCreatePost = (id) => {
        axios.post(`http://localhost:8000/api/createComments`, newPost)
        .then(() => {
            fetchPosts();
            setNewPost({ username: '', comment: '' })
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleDeletePost = (id) => {
        axios.delete(`http://localhost:8000/api/deleteComments/${id}`)
        .then(() => {
            setPosts(posts.filter(post => post._id !== id));
        })
        .catch((error) => {
            console.log(error);
        });
    };
    
    const handleUpdatePost = (id) => {
        axios.put(`http://localhost:8000/api/updateComments/${id}`)
        .then(() => {
            fetchPosts();
            setEditPost(null);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleEditChange = (e, id) => { 
        const { name, value } = e.target;
        setPosts(posts.map(post => post._id === id ? { ...post, [name]: value } : post));
    }

    if (!recipe) {
        return <div>Loading...</div>;
    }

    const ingredients = Object.keys(recipe)
        .filter(key => key.startsWith('strIngredient') && recipe[key])
        .map(key => recipe[key]);

        const instructions = recipe.strInstructions.split('\r\n');

    return (
        <div>
            <link rel="stylesheet" href="../RecipePageDesign.css"/>
            <body className='body8'>
                <div className='navigation'>
                <div className='navigation'>
                    <div className='logo8'></div>
                    
                    <a href='/home'><button className='home'>Home</button></a>
                    <a href='/about'><button className='about'>About</button></a>
                    <a href='/contact'><button className='contact'>Contact</button></a>
                        
                    <div class="dropdown8">
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
                                    <input type='checkbox' /><br/>
                                </label>
                            ))}
                        </p>
                    </div>
                    <p className='e3'>Instructions:</p>
                    <ol className='instructions' >
                        {instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ol>

                    <div className='comments-cont'>

                        <p className='comments'>Join the conversation!</p>

                        <div className='divi'></div>

                        <div className='unposted-box'>
                            <p>By</p>
                            <input type='text' className='username1' placeholder='ex. preciousIvy@01' 
                                value={newPost.username}
                                onChange={(e) => setNewPost({ ...newPost, username: e.target.value })} />
                            <textarea className='comment-box1' placeholder='Enter your comment here...' 
                                value={newPost.comment}
                                onChange={(e) => setNewPost({ ...newPost, comment: e.target.value })} />
                            <button className='post' onClick={handleCreatePost}>Post</button>
                        </div>

                        {posts.map((post) => (
                            <div key={post._id} className='posted-box1'>
                                <p>By: <span className='username2'>{post.username}</span> </p>                                        
                                <textarea className='comment-box2'
                                    onChange={(e) => handleEditChange(e, post._id)}>{post.comment}</textarea> 
                                <button className='clear'>Clear</button>
                                <button className='edit' onClick={() => setEditPost(post)}>Edit Post</button>
                                                                
                                <button className='delete' onClick={() => handleDeletePost(post._id)}>Delete Post</button>
                                <p className='replies1'><i>Replies:</i></p>

                                {editPost && (
                                    <div>
                                        <input type='text'  value={editPost.comment}
                                        onChange={(e) => setEditPost({ ...editPost, comment: e.target.value})}/>
                                        <button className='update' onClick={() => handleUpdatePost(post._id)}>Update Post</button>
                                    </div>
                                )}
                            </div>
                        ))}

                        <div className='posted-box2'>
                            <p>By</p>
                            <p className='username4'>username01</p>
                            <div className='comment-box3'><i>"Lorem Ipsum is simply dummy text of the printing and 
                                typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever 
                                since the 1500s, when an unknown printer took a galley of type and scrambled it to 
                                make a type specimen book. It has survived not only five centuries, but also the 
                                leap into electronic typesetting, remaining essentially unchanged. It was popularised 
                                in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                and more recently with desktop publishing software like Aldus PageMaker including 
                                versions of Lorem Ipsum."</i></div>

                            <button className='reply2'>Reply</button>
                            
                            <p className='replies2'><i>Replies:</i></p>

                            <div className='reply-cont2'>
                                <p>By</p>
                                <input type='text' className='username4' placeholder='ex. preciousIvy@01'></input>
                                <textarea className='reply-box2' placeholder='Reply here...'>Lorem Ipsum is simply dummy text of the printing and 
                                    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever 
                                    since the 1500s, when an unknown printer took a galley of type and scrambled it to 
                                    make a type specimen book. It has survived not only five centuries, but also the 
                                    leap into electronic typesetting, remaining essentially unchanged. It was popularised 
                                    in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                    and more recently with desktop publishing software like Aldus PageMaker including 
                                    versions of Lorem Ipsum.</textarea>
                                <button className='post2'>Post</button>
                            </div>

                            <div className='reply-cont3'>
                                <p>By</p>
                                <p className='username5'>username01</p>
                                <div className='reply-box3'><i>"Lorem Ipsum is simply dummy text of the printing and 
                                    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever 
                                    since the 1500s, when an unknown printer took a galley of type and scrambled it to 
                                    make a type specimen book. It has survived not only five centuries, but also the 
                                    leap into electronic typesetting, remaining essentially unchanged. It was popularised 
                                    in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                    and more recently with desktop publishing software like Aldus PageMaker including 
                                    versions of Lorem Ipsum."</i></div>
                                <button className='clear2'>Clear</button>
                                <button className='edit2'>Edit Post</button>
                                <button className='update2'>Update Post</button>
                                <button className='delete2'>Delete Post</button>
                            </div>

                            <div className='reply-cont4'>
                                <p>By</p>
                                <p className='username6'>username01</p>
                                <div className='reply-box4'><i>"Lorem Ipsum is simply dummy text of the printing and 
                                    typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever 
                                    since the 1500s, when an unknown printer took a galley of type and scrambled it to 
                                    make a type specimen book. It has survived not only five centuries, but also the 
                                    leap into electronic typesetting, remaining essentially unchanged. It was popularised 
                                    in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
                                    and more recently with desktop publishing software like Aldus PageMaker including 
                                    versions of Lorem Ipsum."</i></div>
                                <button className='reply5'>Reply</button>
                            </div>
                        </div>                        

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




            

            