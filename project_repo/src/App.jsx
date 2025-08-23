import './App.css';
import { useState } from 'react';
import ProjectForm from './components/ProjectForm';

function App() {
  // const [mode, setMode] = useState('add');

  return (
    <>
      <h1>Project Management</h1>
      <ProjectForm/>
    </>
  );
}

export default App;
