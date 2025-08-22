import './App.css';
import { useState } from 'react';

function App() {
  // const [mode, setMode] = useState('add');

  return (
    <>
      <h1>Project Management</h1>

      <div className="form-container">
        <form>
          <label>Title:<input></input></label>
          <label>Description:<input></input></label>
          <label>Repo URL:<input></input></label>
          <label>Image:<input type="file" accept="image/*"></input></label>
        </form>
      </div>
    </>
  );
}

export default App;
