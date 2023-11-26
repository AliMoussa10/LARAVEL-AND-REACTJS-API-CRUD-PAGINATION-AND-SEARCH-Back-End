import React from 'react';

const SearchBar = ({ handleSubmit, query, setQuery }) => (
  <form autoComplete='off' className="row mb-4" onSubmit={handleSubmit}>

    <div className="form-group col-md-6 col-offset-sm-3">
      <input type="text"
        name="search_box" id="search_box"
        className="form-control" placeholder="Search By (name,price and desciption)..."
        value={query || ''}
        onChange={(e) => setQuery(e.target.value)} />
    </div>
    <div className="form-group col-md-6 col-offset-md-4">
      <button type="submit" className="btn btn-primary form-control">Search</button>
    </div>
  </form>


)

export default SearchBar;
