const Persons = ({ persons, onDelete }) => persons.map(({ id, name, number }) =>
  <div key={id}>
    {name} {number}
    <button onClick={() => onDelete({ id, name })}>delete</button>
  </div>
)

export default Persons;