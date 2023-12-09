import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "./dropdown.style";
import { skillsList } from "@/constants";
import ChipList from "../../chips/chiplist/ChipList";
import { SkillItemI } from "@/definitions/interfaces";

const DropdownContentText = ({ textLabel, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={{ padding: 5 }}>{textLabel}</Text>
    </TouchableOpacity>
  );
};
const DropdownSearchableInput = ({ setData }: { setData: Function }) => {
  const [dropdownTop, setDropdownTop] = useState(180);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(skillsList);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SkillItemI[]>([]);

  const handleSearchQuery = (queryText: string) => {
    setSearchQuery(queryText);
    setIsDropdownVisible(true);
    setFilteredData((prevState) =>
      skillsList.filter((item) => {
        return (
          item.title.toLowerCase().includes(queryText.toLowerCase()) &&
          !selectedItems.includes(item)
        );
      })
    );
  };

  const handleDropdownItemPress = (item: { id: number; title: string }) => {
    setFilteredData((prevState) =>
      filteredData.filter((filterItem) => filterItem.id !== item.id)
    );
    setSelectedItems((prevState) => [...prevState, item]);
    setSearchQuery("");
  };

  const toggleDropdown = () => {
    if (!selectedItems.length) {
      setFilteredData(skillsList);
    }
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleChipCancelClick = (item: SkillItemI) => {
    setSelectedItems((prevState) =>
      selectedItems.filter((filterItem) => filterItem.id !== item.id)
    );
    setFilteredData((prevState) => [...prevState, item]);
  };

  const renderDropdown = () => {
    if (!isDropdownVisible) {
      return null;
    }

    return (
      <ScrollView
        style={[styles.dropdownContainer]}
        keyboardShouldPersistTaps="always" // Allow tapping outside the dropdown to dismiss the keyboard
      >
        {filteredData.length !== 0 ? (
          <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <DropdownContentText
                textLabel={item.title}
                handlePress={() => handleDropdownItemPress(item)}
              />
            )}
          />
        ) : (
          <Text style={{ padding: 5 }}>No results found</Text>
        )}
      </ScrollView>
    );
  };

  useEffect(() => {
    // This effect will run whenever selectedItems changes
    setData({ data: { skills: selectedItems } });
  }, [selectedItems]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Skills</Text>
        <TextInput
          style={styles.input}
          value={searchQuery}
          placeholder={"Add top 3 skills"}
          onChangeText={handleSearchQuery}
          onBlur={() => {
            setTimeout(() => {
              toggleDropdown();
            }, 200);
          }}
        />
      </View>

      {renderDropdown()}

      {/*  Render selected items as chip*/}
      {selectedItems.length !== 0 && (
        <ChipList
          chips={selectedItems}
          handleChipClick={handleChipCancelClick}
        />
      )}
    </View>
  );
};

export default DropdownSearchableInput;
