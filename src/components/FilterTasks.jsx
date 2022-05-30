import "../styles/FilterTasks.css";
import Button from "./Button";
import Select from "./Select";
const FilterTasks = ({ filter, setFilter, setSorted }) => {

  return (
    <div className="filter__tasks">
      <Button
        body={"All"}
        locked={filter === "all"}
        callback={() => {
          setFilter("");
        }}
      />
      <Button
        body={"Done"}
        locked={filter === "done"}
        callback={() => {

          setFilter("done");
          
        }}
      />
      <Button
        body={"Undone"}
        locked={filter === "undone"}
        callback={() => {
          setFilter("undone");
        }}
      />
      <Select
        callback={(e) => setSorted(e.target.value)}
      />
    </div>
  );
};

export default FilterTasks;