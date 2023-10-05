import { forwardRef, useEffect, useRef, useState } from "react";
import { commonInputClasses } from "../../utils/theme";

const LiveSearch = ({
  results = [],
  selectedResultStyle,
  resultContainerStyle,
  renderItem = null,
  value = "",
  placeholder = "",
  onChange = null,
  onSelect = null,
  inputStyle,
  name,
}) => {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [defaultValue, setDefaultValue] = useState("");

  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };

  const closeSearch = () => {
    setDisplaySearch(false);
    setFocusedIndex(-1);
  };

  const handleOnBlur = () => {
    closeSearch();
  };

  const handleSelection = (selectedItem) => {
    if (selectedItem) {
      onSelect(selectedItem);
      closeSearch();
    }
  };

  const handleKeyDown = (e) => {
    const { key } = e;
    let nextCount;

    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];

    if (!keys.includes(key)) {
      return;
    }

    // move selection up and down

    if (key === "ArrowDown") {
      nextCount = (focusedIndex + 1) % results.length;
    }
    if (key === "ArrowUp") {
      nextCount = (focusedIndex + results.length - 1) % results.length;
    }

    if (key === "Enter") {
      e.preventDefault();
      return handleSelection(results[focusedIndex]);
    }

    if (key === "Escape") {
      return closeSearch();
    }

    setFocusedIndex(nextCount);
  };

  const getInputStyle = () => {
    return inputStyle
      ? inputStyle
      : `${commonInputClasses} border-2 rounded p-1  text-lg`;
  };

  const handleChange = (e) => {
    setDefaultValue(e.target.value);
    onChange && onChange(e);
  };

  useEffect(() => {
    if (value) {
      setDefaultValue(value);
    }
  }, [value]);

  return (
    <div
      className="relative outline-none"
      tabIndex={1}
      onKeyDown={handleKeyDown}
      onBlur={handleOnBlur}
    >
      <input
        type="text"
        id={name}
        name={name}
        className={getInputStyle()}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        value={defaultValue}
        onChange={handleChange}
        autoComplete="off"
        // onBlur={handleOnBlur}
        // onKeyDown={handleKeyDown}
      />

      <SearchResults
        results={results}
        visible={displaySearch}
        focusedIndex={focusedIndex}
        onSelect={handleSelection}
        renderItem={renderItem}
        resultContainerStyle={resultContainerStyle}
        selectedResultStyle={selectedResultStyle}
      />
    </div>
  );
};

const SearchResults = ({
  visible,
  results = [],
  focusedIndex,
  onSelect,
  renderItem,
  resultContainerStyle,
  selectedResultStyle,
}) => {
  const resultContainer = useRef();

  useEffect(() => {
    resultContainer?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusedIndex]);

  if (!visible) return null;

  return (
    <div className=" z-50 absolute right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 mt-1 overflow-auto custom-scroll-bar">
      {results.map((result, index) => {
        const getSelectedClass = () => {
          return selectedResultStyle
            ? selectedResultStyle
            : "dark:bg-dark-subtle bg-light-subtle";
        };
        return (
          <ResultCard
            key={index.toString()}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={
              index === focusedIndex ? getSelectedClass() : ""
            }
            onMouseDown={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  const {
    item,
    renderItem,
    resultContainerStyle,
    selectedResultStyle,
    onMouseDown,
  } = props;

  const getClasses = () => {
    if (resultContainerStyle)
      return resultContainerStyle + " " + selectedResultStyle;

    return (
      selectedResultStyle +
      " cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition"
    );
  };
  return (
    <div onMouseDown={onMouseDown} ref={ref} className={getClasses()}>
      {renderItem(item)}
    </div>
  );
});
export default LiveSearch;