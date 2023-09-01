import { Flex } from '@mantine/core';
import './App.css';
import Inputformm from './InputFormm';
import backgroundImage from './background.webp';

function App() {

  return (
    <Flex   
    direction="row"
    

    >
      <div className="image">
      { <img
      // className="background-container"
      alt=''
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width : '75vw',
        height: '100vh',
      }}
    /> }
      </div>
        <Inputformm/>
    </Flex>
  );
};



export default App;
