const PersonForm = ({ name, phone, onNameChange, onPhoneChange, onSubmit }) =>
  <form onSubmit={onSubmit}>
    <div>
      name: <input value={name} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={phone} onChange={onPhoneChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>


export default PersonForm