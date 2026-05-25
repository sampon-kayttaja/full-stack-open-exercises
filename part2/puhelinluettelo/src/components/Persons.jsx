const Persons = ({ filterPersons }) => {
  return (
    <div>
      {filterPersons.map((person) => (
        <p key={person.name}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

export default Persons