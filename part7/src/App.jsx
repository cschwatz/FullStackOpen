import { useState, useEffect } from "react";
import axios from "axios";
import Notification from "./components/Notification";
import { useDispatch } from 'react-redux';
import { deleteNotification, updateNotification } from "./reducers/notificationReducer";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { type, value, onChange };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => setResources(resources.concat(response.data)));
  }, []);

  const create = (resource) => {
    axios.post(baseUrl, resource).then((response) => {
      const newResource = response.data;
      setResources([...resources, newResource]);
    });
  };

  const service = {
    create: create,
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");
  const dispatch = useDispatch();

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    dispatch(updateNotification([`The Note ${content.value} was created!`, 'success']));
    setTimeout(() => {
      dispatch(deleteNotification(''))
    }, 5000)
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
    dispatch(updateNotification(`The Person ${name.value} was created!`, 'success'));
  };

  return (
    <div>
      <Notification />
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input name='noteForm' {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input name='nameInput' {...name} /> <br />
        number <input name='numberInput' {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
