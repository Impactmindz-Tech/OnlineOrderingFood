import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const SearchComponent = (props) => {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  const handleSearch = () => {
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const places = JSON.parse(result);
        console.log(places);
        setListPlace(places);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <OutlinedInput value={searchText} placeholder="Auto-Complete SelectBox" onChange={(e) => setSearchText(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      <List>
        {listPlace.map((item) => (
          <ListItem
            button
            key={item.place_id}
            onClick={() => {
              console.log(item); // Log the selected item
              setSelectPosition(item);
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <img src="" alt="dsdsd" />
              </ListItemIcon>
              <ListItemText primary={item.display_name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SearchComponent;
