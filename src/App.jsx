import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(total/limit);
  const [recipes, setRecipes] = useState([]);
  const [posts, setPosts] = useState([]);

  // PAGİNATİON KISMI
  function changePage(pageNumber) {
    setPage(pageNumber);
  }

  function handlePrevPage(e) {
    e.preventDefault();
    if((page-1) > 0) {
      setPage(page-1);
    }
  }

  function handleNextPage(e) {
    e.preventDefault();
    if((page+1) <= pageCount) {
      setPage(page+1);
    }
  }

  // PRODUCTSLARI BASTIRMA KISMI
  async function getData() {
    const skip = (page - 1) * limit;

    const fetchUrl = `https://dummyjson.com/products?delay=0&limit=${limit}&skip=${skip}`;

    const data = await fetch(fetchUrl).then(res => res.json());
    setProducts([...data.products]);
    setTotal(data.total);
  }

  useEffect(() => {
    getData();
  }, [page]);

  // RECİPESLARI BASTIRMA KISMI
  async function getRecipesData() {
    const skip = (page - 1) * limit;

    const fetchUrl = `https://dummyjson.com/recipes?delay=0&limit=${limit}&skip=${skip}`;

    const data = await fetch(fetchUrl).then(res => res.json());
    setRecipes([...data.recipes]);
    setTotal(data.total);
  }

  useEffect(() => {
    getRecipesData();
  }, [page]);

  // POST COMMENTSLERİ BASTIRMA KISMI
  async function getPostsData() {
    const skip = (page - 1) * limit;

    const fetchUrl = `https://dummyjson.com/posts?delay=0&limit=${limit}&skip=${skip}`;

    const data = await fetch(fetchUrl).then(res => res.json());
    setPosts([...data.posts]);
    setTotal(data.total);
  }

  useEffect(() => {
    getPostsData();
  }, [page]);

// SAYFALARI GOSTERME KISMI
  function showProducts() {
    document.querySelector('.recipesArea').classList.add('doNotShow');
    document.querySelector('.postCommentsArea').classList.add('doNotShow');
    document.querySelector('.productsArea').classList.remove('doNotShow');
  }

  function showRecipes() {
    document.querySelector('.productsArea').classList.add('doNotShow');
    document.querySelector('.postCommentsArea').classList.add('doNotShow');
    document.querySelector('.recipesArea').classList.remove('doNotShow');
  }

  function showPosts() {
    document.querySelector('.productsArea').classList.add('doNotShow');
    document.querySelector('.recipesArea').classList.add('doNotShow');
    document.querySelector('.postCommentsArea').classList.remove('doNotShow');
  }

  return (
    <>
      <div className="container">
        <header className="header">
          <div className="buttons">
            <button onClick={showProducts}>Products</button>
            <button onClick={showRecipes}>Recipes</button>
            <button onClick={showPosts}>Post And Comments</button>
          </div>

          <div className="searchBar">
            <input type="text" />
          </div>
        </header>

        <div className="productsArea doNotShow">
          <div className="products">
            {products.map(x => <div className="product" key={x.id}>
              <h4>{x.title}</h4>
              <img src={x.thumbnail} />
            </div>)}
          </div>

          {pageCount > 0 && 
            <ul className="pagination">
              <li><a href="#" onClick={handlePrevPage}>&lt;</a></li>
              {
                Array
                  .from({ length: pageCount }, (v, i) => (i+1))
                  .map(x => <li key={x}><a href="#" className={page === x ? 'activePage' : ''} onClick={e => { e.preventDefault(); changePage(x); }}>{x}</a></li>)
              }
              <li><a href="#" onClick={handleNextPage}>&gt;</a></li>
            </ul>
          }
        </div>
        
        <div className="recipesArea doNotShow">
          <div className="recipes">
            {recipes.map(x => <div className="recipe" key={x.id}>
                <div className="productTexts">
                  <div className="title">
                    <h4>{x.name}</h4>
                    <p>puan: {x.rating}</p>
                  </div>

                  <ul className='explanation'>
                    <h4>yapım aşamaları</h4>
                    {x.instructions.map(x =><li> {x} </li>)}
                  </ul>

                  <ul className='materials'>
                    <h4>Malzemeler</h4>
                    {x.ingredients.map(x => <li> {x} </li>)}
                  </ul>
                </div>

                <div className="productImage">
                  <img src={x.image} alt="" />

                  <div className="productDetails">
                    <p>Yiyecek Kişi sayısı: {x.servings} </p>
                    <p>zorluk: {x.difficulty} </p> 
                    <p> Hazırlama Süresi: {x.prepTimeMinutes} dk </p>
                    <p> Pişme Süresi: {x.cookTimeMinutes} dk </p>
                  </div>
                </div>
            </div>)}            
          </div>

          {pageCount > 0 && 
            <ul className="pagination">
              <li><a href="#" onClick={handlePrevPage}>&lt;</a></li>
              {
                Array
                  .from({ length: pageCount }, (v, i) => (i+1))
                  .map(x => <li key={x}><a href="#" className={page === x ? 'activePage' : ''} onClick={e => { e.preventDefault(); changePage(x); }}>{x}</a></li>)
              }
              <li><a href="#" onClick={handleNextPage}>&gt;</a></li>
            </ul>
          }
        </div>

        <div className="postCommentsArea doNotShow">
          <div className="posts">
            {posts.map(x => <div className="post" key={x.id}>
              <p> {x.title} </p>
              <p> {x.body} </p>
              {x.tags.map(x =><li> {x} </li>)}
            </div>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
