import React, { useState } from "react";
import Select from "react-select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?q=Unter%20den%20Linden%201%20Berlin&format=json&addressdetails=1&limit=1&polygon_svg=1";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

const SearchComponent = (props) => {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  console.log(searchText);
  return (
    <>
      <OutlinedInput value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          const params = {
            q: searchText,
            format: "json",
            addressdetails: 1,
            polygon_geojson: 0,
          };
          const queryString = new URLSearchParams(params).toString();
          const requsetOptions = {
            method: "GET",
            redirect: "follow",
          };
          fetch(`${NOMINATIM_BASE_URL}${queryString}`, requsetOptions)
            .then((response) => response.text())
            .then((result) => {
              console.log(JSON.parse(result));
              setListPlace(JSON.parse(result));
            })
            .catch((error) => console.log(error));
        }}
      >
        Primary
      </Button>
      <List>
        {listPlace?.map((item) => {
          return (
            <ListItem
              button
              key={item?.osm_id}
              onClick={() => {
                setSelectPosition(item);
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <img src="" alt="dsdsd" />
                </ListItemIcon>
                <ListItemText primary={item?.display_name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default SearchComponent;
