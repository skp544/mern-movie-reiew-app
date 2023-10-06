import { createContext, useState } from "react";
import { toast } from "react-hot-toast";

export const SearchContext = createContext();

let timoeoutId;

const debounce = (func, delay) => {
  return (...args) => {
    if (timoeoutId) clearTimeout(timoeoutId);
    timoeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const SearchProvider = ({ children }) => {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);

  const search = async (method, query, updaterFun) => {
    const { success, message, results } = await method(query);

    if (!success) {
      return toast.error(message);
    }

    if (!results.length) {
      setResultNotFound(true);
    }

    setResults(results);
    updaterFun && updaterFun([...results]);
  };

  const debounceFunc = debounce(search, 300);

  const handleSearch = (method, query, updaterFun) => {
    setSearching(true);

    if (!query.trim()) {
      updaterFun && updaterFun([]);
      resetSearch();
    }

    debounceFunc(method, query, updaterFun);
  };

  const resetSearch = () => {
    setSearching(false);
    setResults([]);
    setResultNotFound(false);
  };

  return (
    <SearchContext.Provider
      value={{ handleSearch, searching, resultNotFound, results, resetSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
