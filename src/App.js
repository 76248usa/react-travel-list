import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  const [items, setItems] = useState([]);
  
  function handleAddItems(item) {
    setItems([...items, item])    
  }
  const clearList = () => {
    setItems([]);
  }
  function handleDeleteItem(id) {
   setItems(items.filter(item => 
    item.id !== id))
  }

  const handleToggleItem = (id) => {
    setItems(items.map(item => {
      return item.id === id ? {...item, packed: !item.packed}
      : item
    }))
  }

  return (
    <div>
     <h2>App</h2>
     <Logo />
     <Form onAddItems = {handleAddItems}/>
     <PackingList items={items} onDeleteItem={handleDeleteItem}
     onToggleItems = {handleToggleItem} onClearList={clearList}  />
     <Stats />
    </div>
  );
}

function Logo() {
  return (
    <div>
     <h2>🌴 Far Away 👜</h2>
    </div>
  );
}

function Form({onAddItems}) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!description) return;
    const newItem = {description, quantity, packed: false, id: Date.now()}
    onAddItems(newItem);
    setDescription('');
    setQuantity(1);
  }

  return (
    <form className='add-form' onSubmit = {handleSubmit}>
     <h3>What do you need for your 😎 trip?</h3>
     <select value={quantity}
     onChange={(e) => setQuantity(Number(e.target.value))}>
    {Array.from({length: 20}, (_, i) => i + 1).map
    ((num) => (
      <option value={num} key={num}>
        {num}
      </option>    
    ))} 
    
     </select>
     <input type="text" 
     placeholder='Item...'
     value={description}
     onChange = {(e) => setDescription((e.target.value))}
      />
     <button >Add</button>
    </form>
  );
}

function PackingList({items, onDeleteItem, onToggleItems, 
  setItems, onClearList}) {
  const [sortBy, setSortBy] = useState('input')

  let sortedItems;

  if(sortBy === 'input'){
    sortedItems = items;
  }
  if(sortBy === 'description'){
    sortedItems = items.slice()
    .sort((a,b) => a.description.localeCompare(b.description));
  }
  if(sortBy === 'packed'){
    sortedItems = items.slice()
    .sort((a,b) => Number(a.packed) - Number(b.packed));
  }

  const clearList = () => {
    setItems([])
  }

  return (
    <div className='list'>
    <ul>
      {sortedItems.map((item) => {
        return  <Item item={item} key={item.key} 
        onDeleteItem={onDeleteItem} onToggleItem={onToggleItems} />
      })}   
    </ul>
    <div className="actions">
      <select name="" id="" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="input">Sort by Input Order</option>
        <option value="description">Sort by Description</option>
        <option value="packed">Sort by packed Status</option>
      </select>
      <button onClick={onClearList}>Clear list</button>
    </div>
    </div>
  );
}

function Item({item, onDeleteItem, onToggleItem}) {
  const {description, id, quantity, packed} = item;
  
return <div> 
<li>
<input type="checkbox" 
value={packed}
onChange={() => {onToggleItem(id)}}
 />
<span style={packed ? {textDecoration: 'line-through'} : {}}>{' '}{quantity}{' '}{description}</span>
<button onClick={() => onDeleteItem(item.id)}>😡</button></li>
</div>
}


function Stats() {
  return (
    <footer className='stats'>
     You have X items on your list, and you already packed X (X%).
    </footer>
  );
}

export default App;
