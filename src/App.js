
import './App.css';
import Banner from './Components/Banner/Banner';
import NavBar from './Components/NavBar/NavBar';
import React from 'react';
import RowPost from './Components/RowPost/RowPost';
import { actions, comedy, originals } from './Constants/Links';


function App() {
  return (
    <div>
    <NavBar/>
    <Banner/>
    <RowPost title='Netflix Originals' url={originals}/>
    <RowPost title='Actions' url={actions} isSmall/>
    <RowPost title='Comedy' url={comedy} isSmall/>
    

    </div>
  );
}

export default App;
