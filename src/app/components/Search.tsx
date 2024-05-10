import React, { useState } from 'react';
import { TextField, List, ListItem, ListItemText } from '@mui/material';

function Search({setSelectedSymbol}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    try {
      const response = await fetch(`http://localhost:3000/api/search?q=${value}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <TextField
        fullWidth
        label="Search"
        variant="outlined"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
        sx={{ height: 40, '.MuiInputBase-root': { height: '100%' } }}
      />
      <List>
        {results.length > 0 && results.map((item, index) => (
          <ListItem key={item._id} divider onClick={()=>{
            setSelectedSymbol(item.symbol);
            setResults([]);
          }}>
            <ListItemText primary={item.symbol} /> 
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Search;
