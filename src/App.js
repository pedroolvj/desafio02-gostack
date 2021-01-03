import React, { useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    api.get('/repositories').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const title = document.getElementById('userName');
    const owner = document.getElementById('userUrl');
    const response = await api.post('/repositories', {
      title: title.value,
      owner: owner.value,
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const getDeletedResp = projects.findIndex(project => project.id === id);

    const project = projects

    project.splice(getDeletedResp, 1);

    setProjects([...project]);
  }

  return (
    <div className="container">
      <div className="ul-container">
        <ul data-testid="repository-list">
          {projects.map(project => {
            return <li key={project.id}> 
                      <div className="title"> {project.title} </div>
                      <button onClick={() => handleRemoveRepository(project.id)}>
                        Remover
                      </button>
                    </li>
          })}
        </ul>

        
      </div>
      <div className="inputs-container">
        <div className="inputs">
          <label htmlFor="">User</label>
          <input type="text" name="" id="userName"/>
        </div>
        <div className="inputs">
          <label htmlFor="">Repositorio</label>
          <input type="text" name="" id="userUrl"/>
        </div>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>

  );
}

export default App;
