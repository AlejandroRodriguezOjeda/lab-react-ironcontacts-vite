import "./App.css";
import allContacts from "./contacts.json";
import { useState } from "react";

function App() {
  const [contacts, setContacts] = useState(allContacts.slice(0, 5));

  const handleAddrandomContact = () => {
    console.log("intentando añadir un contacto");
    let randomNumber = Math.random() * allContacts.length;
    let randomIndex = Math.floor(randomNumber);
    let randomContact = allContacts[randomIndex];

    let repeatedContact = contacts.find((eachContact) => {
      if (eachContact.id === randomContact.id) {
        return true;
      }
    });

    if (repeatedContact !== undefined) {
      handleAddrandomContact();
      return;
    }

    let clone = JSON.parse(JSON.stringify(contacts));
    clone.unshift(randomContact);

    setContacts(clone);
  };
  const handleSortContactsByName = () => {
    console.log("intentando ordenar");
    let clone = JSON.parse(JSON.stringify(contacts));
    clone.sort((con1, con2) => {
      return con1.name > con2.name ? 1 : -1;
    });
    setContacts(clone);
  };

  const handleSortContactsByPopularity = () => {
    console.log("intentando ordenar");
    let clone = JSON.parse(JSON.stringify(contacts));
    clone.sort((con1, con2) => {
      return con1.popularity > con2.popularity ? -1 : 1;
    });
    setContacts(clone);
  };

  const handleDeleteContact = (id) => {
    console.log("intentando borrar");
    let filterArr = contacts.filter((eachContact) => eachContact.id !== id);
    setContacts(filterArr);
  };

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>

      <button onClick={handleAddrandomContact}>Add Random Contact</button>
      <button onClick={handleSortContactsByName}>Sort by Name</button>
      <button onClick={handleSortContactsByPopularity}>
        Sort by Popularity
      </button>

      <table>
        <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
        </tr>
</thead>
<tbody>
        {contacts.map((eachContact, i) => (
          <tr key={i}>
            <td>
              <img
                src={eachContact.pictureUrl}
                alt={eachContact.name}
                style={{ width: "200px" }}
              />
            </td>
            
            <td>{eachContact.name}</td>
            <td>{eachContact.popularity.toFixed(2)}</td>
            <td>{eachContact.wonOscar ? "🏆" : null}</td>
            <td>{eachContact.wonEmmy ? "🌟" : null}</td>
         <td><button onClick={() => handleDeleteContact(eachContact.id)}>
              Delete
            </button></td> 
          </tr>
          
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
