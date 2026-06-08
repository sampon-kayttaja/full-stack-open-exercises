import React from 'react'

const Persons = ({ filterPersons, deletePerson }) => {
  return (
    <div>
      {filterPersons.map((person) => (
        <React.Fragment key={person.id}>
          <p>{person.name} {person.number}</p>
          <button onClick={() => deletePerson(person.id)}>
            delete
          </button>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Persons
