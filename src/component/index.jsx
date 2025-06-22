import { useEffect, useState } from "react";
import "./styles.css";
import Suggestion from "./suggestion";

const SearchAutoComplete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleOnChange = (event) => {
    const query = event.target.value.toLowerCase(); // first we will store the value written in the input. Note that everything is converted into lower case in order to avoid unnecessary error.
    setSearchParam(query); // then we will set that value in searchParam
    if (query.length > 1) {
      // we at least have to type 2 characters in the input
      const filteredData =
        user && user.length
          ? user.filter((item) => item.toLowerCase().indexOf(query) !== -1) // we filter the data which is inside the user by checking in the each item whether the typed in query is present or not. Since the data in the user is a string and whatever we type in the input is also a string therefore we will check the indexOf(typed in input i.e query) is present in each of the item of the user or not. if it is present then it will return an index which will !== 0 i.e why item.indexOf(query) !== 0 is written.
          : [];
      setFilteredUsers(filteredData);
      setShowDropDown(true);
    } else setShowDropDown(false);
  };

  const handleOnClick = (event) => {
    //when we click on the list we need an event handler
    // console.log(event.target.innerText);//check what you are getting by console.log
    setShowDropDown(false); //we will disable the list once we have clicked on anyone
    setSearchParam(event.target.innerText); // the input box should be filled with the name that we have clicked
    setFilteredUsers([]); // after that we set the filtered list to blank because we don't want any more suggestion
  };

  const fetchUserList = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      // console.log(data); //always console.log the data because that way you will get the name of the object in "[[PromiseResult]]:Object" when you expand it.
      if (data && data.users && data.users.length) {
        // after knowing the name of the object we will map over the object so that we can get an array of info
        setUser(data.users.map((user) => user.firstName)); // we set the firt name of all the users
        setLoading(false); // loading is set to false
        setError(null); // and error is also set to null
      }
    } catch (error) {
      setLoading(false);
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  console.log(user, filteredUsers);

  return (
    <div className="main-container">
      {loading ? (
        <h1>Please Wait!</h1>
      ) : (
        <input
          type="text"
          name="user-search"
          className="input-search"
          placeholder="Search name here!"
          value={searchParam}
          onChange={handleOnChange}
        />
      )}
      {showDropDown && (
        <Suggestion handleOnClick={handleOnClick} data={filteredUsers} />
      )}
    </div>
  );
};

export default SearchAutoComplete;
