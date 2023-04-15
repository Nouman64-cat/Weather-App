import React from 'react';
import './App.css';
import News from './components/News/News';
import Weather from './components/Weather/Weather';
import Search from './components/Search/Search';

const App = () => {


  return (
    <div className='app'>
      {/* <Search/> */}
      <Weather />
    </div>
  );
};

export default App;
