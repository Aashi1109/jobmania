import ChipList from "@/components/common/chips/chiplist/ChipList";
import { useAuth } from "@/context/AuthContext";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./profilescreen.style";
import { CustomModal, VerticalDivider } from "@/components";
import { COLORS, SIZES, icons } from "@/constants";
import HeadingCard from "@/components/common/cards/HeadingCard";
import { formatDate } from "@/utils/helpers/generalHelpers";

import TextWithCopy from "@/components/common/textwithcopy/TextWithCopy";
import Chip from "@/components/common/chips/chip/Chip";
import { useState } from "react";
import EditDataModal from "@/components/common/editdata/EditDataModal";
import { ProfileEditE } from "@/definitions/enums";

const ProfileScreen = () => {
  // states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditingField, setCurrentEditingField] =
    useState<ProfileEditE>(null);

  // Context
  const { user } = useAuth();

  // User data
  const profileImage = user.profileImage.profileUrl;
  const userSkills = user.skills;
  const resumeData = user.resume;
  const resumeName = resumeData.fileName;

  // Functions
  const toogleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  const handleEditField = (editingField: ProfileEditE) => {
    return () => {
      setIsModalOpen(true);
      setCurrentEditingField(editingField);
    };
  };

  return (
    <View style={styles.container}>
      {/* </HeadingCard> */}

      {/* More details of user */}
      <View style={styles.bottomContainer}>
        <HeadingCard
          cardHeading="General"
          handleRightButtonClick={handleEditField(ProfileEditE.PROFILE)}
          leftIconData={icons.emailOutlined}
        >
          <View style={styles.profileContainer}>
            <Image source={{ uri: profileImage }} style={styles.image} />
            <View style={styles.rightContainer}>
              <Text style={styles.nameText}>{user.fullName}</Text>
              <Text style={styles.headingText}>{user.heading}</Text>

              {user.createdAt && (
                <Text style={{ color: COLORS.gray }}>
                  {"Active since " + formatDate(user.createdAt?.toDate())}
                </Text>
              )}
            </View>
            {/* <Pressable onPress={handleEditField(ProfileEditE.PROFILE)}> */}
            {/* <Image
              source={icons.editIcon}
              resizeMode="contain"
              style={styles.editIcon}
            /> */}
            {/* </Pressable> */}
          </View>
        </HeadingCard>

        <HeadingCard
          cardHeading="Username"
          handleRightButtonClick={handleEditField(ProfileEditE.USERNAME)}
          leftIconData={icons.usernameOutlined}
        >
          <TextWithCopy text={user.userName || "N/A"} />
        </HeadingCard>

        <HeadingCard
          cardHeading="Email"
          handleRightButtonClick={null}
          leftIconData={icons.emailOutlined}
        >
          <TextWithCopy text={user.email || "N/A"} />
        </HeadingCard>

        <HeadingCard
          cardHeading="Description"
          handleRightButtonClick={handleEditField(ProfileEditE.DESCRIPTION)}
          leftIconData={icons.infoOutlined}
        >
          <Text>{user.description || "N/A"}</Text>
        </HeadingCard>

        <HeadingCard
          cardHeading="Skills"
          handleRightButtonClick={handleEditField(ProfileEditE.SKILLS)}
          leftIconData={icons.skillsOutlined}
        >
          {userSkills?.length ? (
            <ChipList chips={userSkills} handleChipClick={null} />
          ) : (
            <Text>No skills found</Text>
          )}
        </HeadingCard>

        <HeadingCard
          cardHeading="Location"
          handleRightButtonClick={handleEditField(ProfileEditE.LOCATION)}
          leftIconData={icons.location}
        >
          <Text>{user?.location?.address ?? "N/A"}</Text>
        </HeadingCard>

        <HeadingCard
          cardHeading="Resume Details"
          handleRightButtonClick={handleEditField(ProfileEditE.RESUME)}
          leftIconData={icons.resumeOutlined}
        >
          <View style={{ gap: 5 }}>
            {resumeData ? (
              <>
                <Chip
                  chipData={{ id: Date.now(), title: resumeName }}
                  handleClick={null}
                />
                <Text style={{ fontSize: SIZES.small }}>
                  Last updated on{" "}
                  <Text style={{ fontSize: SIZES.small, fontStyle: "italic" }}>
                    {formatDate(resumeData.createdAt?.toDate()) ?? "N/A"}
                  </Text>
                </Text>
              </>
            ) : (
              <Text>No resume found</Text>
            )}
          </View>
        </HeadingCard>
      </View>

      {/* Modal to edit and save data */}
      <CustomModal modalVisible={isModalOpen} toggleModal={toogleModal}>
        <EditDataModal
          currentEditingField={currentEditingField}
          toogleModal={toogleModal}
          prevData={user}
        />
      </CustomModal>
    </View>
  );
};

export default ProfileScreen;
