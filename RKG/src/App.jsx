import { useEffect, useReducer, useRef, useState } from 'react'
import './App.css'
import { Navbar, Logo, SearchBox, NumResults } from './components/Navbar'
import { SideNavbar } from './components/SideNavbar'
import Main from './components/Main'
import { Box } from './components/Box'
import Loading from './components/Loading'
import Preview from './components/Preview'
const apiKey = 'G1q_z2nwPqzM5R1S-FdpvO6RBVPgbvLtpOEoSieTKQs';

function reducer (state, action) {
   console.log(state.show);
   switch(action.type) {
    case 'dec':
      return {...state, show: state.show - 1};
    case 'inc':
      return {...state, show: state.show + 1};
    case 'search':
      return {...state, query: action.payload};
    default:
      throw new Error('Unknown action');
   }
}

function App() {

  const initialState = {show: Number(1), down: {}, query: ""};
  const [images, setImages] = useState([]);
  const [results, setResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [Error, setError] = useState("");
  const [obj, dispatch] = useReducer(reducer, initialState)
  const [down, setDown] = useState()

  const {show, query} = obj;

  function download(imageUrl) {
   
      async function downloadImage() {
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
  
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'downloaded_image.png');
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error downloading image:', error);
        }
      }
      downloadImage()

  }

  useEffect(() => {
    const controller = new AbortController();
    const per_page = Math.floor(Math.random() * 100) + 1;
    async function apiCall() {
      try {
        setError("")
        setIsLoading(true);
        const res = await fetch(`https://api.unsplash.com/search/photos?page=${show}&query=${query}&per_page=${per_page}&client_id=${apiKey}`, {
          signal: controller.signal
        });
        const data = await res.json();

        const result = data.results.map(item => item.urls.raw);
        setError("");
        setResults(result.length);
        setImages(result);
      } catch (err) {
        // console.log(err);
        setError(err.message)
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      // setResults(0)
      // setImages([])
      return;
    }

    apiCall();

    return function () {
      controller.abort();
    }
  }, [query, show])
  
  function ShowMore () {
     dispatch({type: "inc", payload: 1})
      // console.log(show);
  }

  function ShowLess () {
    dispatch({type: "dec", payload: 1})
    // console.log(show);
  }
  
  function setQuery (e) {
     dispatch({type: "search", payload: e})
  }

  function Toggle (url) {
   setDown(url)
  }
  return (
    <>
      <Navbar>
        <Logo />
        <SearchBox value={query} setQuery={setQuery} />
        <NumResults count={results} />
      </Navbar>
      <Main>
        <SideNavbar setQuery={setQuery} />
        {isLoading && <Loading />}
        {!isLoading && !Error && <Box images={images} ShowMore={ShowMore} ShowLess={ShowLess} download={download}  preView={Toggle}/>}
       
      </Main>
      {down && <Preview toggler={Toggle} url={down}/>}
    </>
  )
}

export default App
