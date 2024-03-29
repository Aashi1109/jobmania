import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, Pressable, View } from "react-native";
import { TouchableOpacity } from "react-native";

import styles from "./dropdown.style";
import { COLORS, SIZES, skillsList } from "@/constants";
import ChipList from "../../chips/chiplist/ChipList";
import { SkillItemI } from "@/definitions/interfaces";
import VerticalDivider from "../../VerticalDivider";

const DropdownContentText = ({ textLabel, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={{ marginVertical: 2 }}>
      <Text style={{ padding: 5, fontSize: SIZES.medium }}>{textLabel}</Text>
    </TouchableOpacity>
  );
};
const DropdownSearchableInput = ({
  setData,
  prevData,
}: {
  setData: Function;
  prevData?: SkillItemI[];
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(skillsList);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState<SkillItemI[]>(
    prevData ?? []
  );

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

    setIsDropdownVisible((prevState) => !prevState);
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
        style={styles.dropdownContainer}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{ padding: 10 }}
      >
        <View style={{ gap: 5 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: SIZES.medium, textAlign: "center" }}>
              All Skills
            </Text>
            <Pressable onPress={toggleDropdown} style={{ marginTop: -4 }}>
              <Text
                style={{
                  fontSize: SIZES.large,
                  fontWeight: "900",
                }}
              >
                &times;
              </Text>
            </Pressable>
          </View>
          <VerticalDivider marginVertical={5} height={2} width={"100%"} />
        </View>
        {filteredData.length !== 0 ? (
          filteredData.map((item) => (
            <DropdownContentText
              key={item.id}
              textLabel={item.title}
              handlePress={() => handleDropdownItemPress(item)}
            />
          ))
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
          placeholderTextColor={COLORS.inputPlaceHolderColor}
          onChangeText={handleSearchQuery}
          // onBlur={toggleDropdown}
          onFocus={() => setIsDropdownVisible(true)}
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
