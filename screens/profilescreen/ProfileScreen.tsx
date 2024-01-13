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

  return (
    <View style={styles.container}>
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
        <Pressable onPress={null}>
          <Image
            source={icons.editIcon}
            resizeMode="contain"
            style={styles.editIcon}
          />
        </Pressable>
      </View>
      {/* </HeadingCard> */}

      {/* More details of user */}
      <View style={styles.bottomContainer}>
        {user.userName && (
          <HeadingCard
            cardHeading="Username"
            handleRightButtonClick={null}
            leftIconData={icons.usernameOutlined}
          >
            <TextWithCopy text={user.userName} />
          </HeadingCard>
        )}
        {user.email && (
          <HeadingCard
            cardHeading="Email"
            handleRightButtonClick={null}
            leftIconData={icons.emailOutlined}
          >
            <TextWithCopy text={user.email} />
          </HeadingCard>
        )}
        {user.description && (
          <HeadingCard
            cardHeading="Description"
            handleRightButtonClick={null}
            leftIconData={icons.infoOutlined}
          >
            <Text>{user.description}</Text>
          </HeadingCard>
        )}
        {userSkills?.length && (
          <HeadingCard
            cardHeading="Skills"
            handleRightButtonClick={null}
            leftIconData={icons.skillsOutlined}
          >
            <ChipList chips={userSkills} handleChipClick={null} />
          </HeadingCard>
        )}
        {user.location.address && (
          <HeadingCard
            cardHeading="Location"
            handleRightButtonClick={null}
            leftIconData={icons.location}
          >
            <Text>{user?.location?.address ?? "N/A"}</Text>
          </HeadingCard>
        )}
        {resumeName && (
          <HeadingCard
            cardHeading="Resume Details"
            handleRightButtonClick={null}
            leftIconData={icons.resumeOutlined}
          >
            <View style={{ gap: 5 }}>
              <Chip
                chipData={{ id: Date.now(), title: resumeName }}
                handleClick={null}
              />
              <Text style={{ fontSize: SIZES.small }}>
                Last updated on{" "}
                <Text style={{ fontSize: SIZES.small, fontStyle: "italic" }}>
                  {formatDate(resumeData.createdAt?.toDate())}
                </Text>
              </Text>
            </View>
          </HeadingCard>
        )}
      </View>

      {/* Modal to edit and save data */}
      <CustomModal modalVisible={isModalOpen} toggleModal={toogleModal}>
        <EditDataModal />
      </CustomModal>
    </View>
  );
};

export default ProfileScreen;
