const Persons = ({ persons, onDelete }) => persons.map(({ id, name, phone }) =>
  <div key={id}>
    {name} {phone}
    <button onClick={() => onDelete({ id, name })}>delete</button>
  </div>
)

export default Persons;