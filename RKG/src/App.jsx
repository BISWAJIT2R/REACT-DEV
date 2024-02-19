import { useEffect, useState } from 'react'
import './App.css'
import { Navbar, Logo, SearchBox, NumResults } from './components/Navbar'
import { SideNavbar } from './components/SideNavbar'
import Main from './components/Main'
import { Box } from './components/Box'
import Loading from './components/Loading'

const apiKey = 'G1q_z2nwPqzM5R1S-FdpvO6RBVPgbvLtpOEoSieTKQs';
function App() {

  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [results, setResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController();
    const per_page = Math.floor(Math.random() * 100) + 1;
    async function apiCall() {
      try {
        setIsLoading(true);
        const res = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&per_page=${per_page}&client_id=${apiKey}`, {
          signal: controller.signal
        });
        const data = await res.json();
        const result = data.results.map(item => item.urls.raw);
        setResults(result.length);
        setImages(result);
      } catch (err) {
        console.log(err);
      }finally {
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
  }, [query])


  return (
    <>
      <Navbar>
        <Logo />
        <SearchBox value={query} setQuery={setQuery} />
        <NumResults count={results}/>
      </Navbar>
      <Main>
        <SideNavbar setQuery={setQuery}/>
        {isLoading && <Loading/>}
        {!isLoading && <Box images={images}/>}
      </Main>
    </>
  )
}

export default App
