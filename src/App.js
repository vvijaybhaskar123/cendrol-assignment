import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

function App() {
  const [data1, setData1] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [jokes, setJokes] = useState([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetching() {
      const response1 = await axios('https://api.chucknorris.io/jokes/categories');
      setData1(response1.data);
    }
    fetching();
  }, []);

  const handlesubmit = async (item) => {
    let jokes = [];
    let jokeIds = new Set();
    while (true) {
      const response = await axios(`https://api.chucknorris.io/jokes/random?category=${item}`);
      if (!jokeIds.has(response.data.id)) {
        jokes.push(response.data);
        jokeIds.add(response.data.id);
      } else {
        break;
      }
    }
    setJokes(jokes);
    setCurrentJokeIndex(0);
    setSelectedData(item);
  };

  const handleDismiss = async () => {
    setLoading(true);
    const response = await axios(`https://api.chucknorris.io/jokes/random?category=${selectedData}`);
    setJokes((prevJokes) => [...prevJokes, response.data]);
    setLoading(false);
    setCurrentJokeIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className='h-fit flex flex-col justify-center items-center mt-4 overflow-x-hidden relative'>
      <h1 className='mb-10 text-4xl text-green-500 animate-bounce font-bold'>Chuck Norris</h1>
      <div className='grid lg:grid-cols-4 lg:gap-11 md:grid-cols-2 md:gap-5 sm:grid-cols-4 sm:gap-8 grid-cols-4 gap-3 '>
        {data1.map((item) => {
          const capitalizedItem = item.charAt(0).toUpperCase() + item.slice(1);
          return (
            <button
            key={item}
            className='w-14 h-8 sm:w-32 sm:h-20 md:w-48 md:h-32 lg:w-60 lg:h-40 xl:w-72 xl:h-48 2xl:w-60 2xl:h-40 bg-white rounded-lg font-bold transition ease-in-out delay-150 bg-white-500 hover:-translate-y-1 hover:scale-110 hover:bg-white-500 duration-300 border-2 border-solid border-black...'
            onClick={() => {
              handlesubmit(item);
            }}
          >
              <h3 className='text-purple text-xs sm:text-sm md:text-lg lg:text-xl text-center'>{capitalizedItem}</h3>
              <p className='text-emerald text-xs mt-2 text-center hidden  sm:hidden lg:block md:block '>Unlimited Jokes On {item}</p>
            </button>
          );
        })}
      </div>

      
      {jokes.length > 0 && (
        <div className='default:absolute bottom:0 right-50 mt-10 sm:absolute right-50 mt-30  md:absolute top-50 right-50 lg:absolute top-50 right-50 xl:absolute top-50 right-50 2xl:absolute top-50 right-50 '>

          <div className='w-[100%] max-w-lg bg-darkBlue rounded-lg shadow-lg p-6'>
            <div className='text-white flex justify-between items-center mb-4'>
              <h1 className='text-3xl '>{selectedData.charAt(0).toUpperCase() + selectedData.slice(1)}</h1>
              <button  onClick={() => setJokes([])}>
                x
              </button>
            </div>

            <div className='w-full border-2 border-solid border-white mt-8 px-4 py-6'>
              {loading ? (
                <div className='flex justify-center items-center'>
                  <ClipLoader color='#000' size={50} />
                </div>
              ) : (
                <>
                  <p className='text-white text-base'>" {jokes[currentJokeIndex].value} "</p>
                  
                    <button className='bg-indigo-500 w-full mt-4 py-2' onClick={handleDismiss}>
                      Next
                    </button>
                  
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
