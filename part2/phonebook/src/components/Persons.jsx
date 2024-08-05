const Persons = ({ persons }) => persons.map(({ id, name, phone }) => <div key={id}>{name} {phone}</div>)

export default Persons;