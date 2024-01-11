import ChipList from "@/components/common/chips/chiplist/ChipList";
import { useAuth } from "@/context/AuthContext";
import { Image, Pressable, Text, View } from "react-native";
import styles from "./profilescreen.style";
import { VerticalDivider } from "@/components";
import { COLORS, SIZES, icons } from "@/constants";
import HeadingCard from "@/components/common/cards/HeadingCard";
import { formatDate } from "@/utils/helpers/generalHelpers";

import TextWithCopy from "@/components/common/textwithcopy/TextWithCopy";
import Chip from "@/components/common/chips/chip/Chip";

const ProfileScreen = () => {
  const { user } = useAuth();

  const profileImage = user.profileImage.profileUrl;
  const userSkills = user.skills;
  const resumeData = user.resume;
  const resumeName = resumeData.fileName;

  return (
    <View style={styles.container}>
      {/* <HeadingCard
        paddingHorizontal={0}
        paddingVertical={0}
        handleEditPress={null}
        cardHeading="Basic Info"
      > */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: profileImage }} style={styles.image} />
        <View style={styles.rightContainer}>
          <Text style={styles.nameText}>{user.fullName}</Text>
          <Text style={styles.headingText}>{user.heading}</Text>
          {/* <ChipList
            chips={user.skills}
            handleChipClick={null}
            isVerticalScroll={false}
            hideMoreIndicator={true}
          /> */}

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
        {/* <VerticalDivider
          height={1}
          width={"100%"}
          backgroundColor={"rgba(0,0,0,.1)"}
        /> */}
        {user.userName && (
          <HeadingCard
            cardHeading="Username"
            handleEditPress={null}
            iconData={icons.usernameOutlined}
          >
            <TextWithCopy text={user.userName} />
          </HeadingCard>
        )}
        {user.email && (
          <>
            {/* <VerticalDivider
              height={6}
              width={"100%"}
              backgroundColor={"rgba(0,0,0,.1)"}
            /> */}
            <HeadingCard
              cardHeading="Email"
              handleEditPress={null}
              iconData={icons.emailOutlined}
            >
              <TextWithCopy text={user.email} />
            </HeadingCard>
          </>
        )}
        {user.description && (
          <>
            {/* <VerticalDivider
              height={6}
              width={"100%"}
              backgroundColor={"rgba(0,0,0,.1)"}
            /> */}
            <HeadingCard
              cardHeading="Description"
              handleEditPress={null}
              iconData={icons.infoOutlined}
            >
              <Text>{user.description}</Text>
            </HeadingCard>
          </>
        )}
        {userSkills?.length && (
          <>
            {/* <VerticalDivider
              height={6}
              width={"100%"}
              backgroundColor={"rgba(0,0,0,.1)"}
            /> */}
            <HeadingCard
              cardHeading="Skills"
              handleEditPress={null}
              iconData={icons.skillsOutlined}
            >
              <ChipList chips={userSkills} handleChipClick={null} />
            </HeadingCard>
          </>
        )}
        {user.location.address && (
          <>
            {/* <VerticalDivider
              height={6}
              width={"100%"}
              backgroundColor={"rgba(0,0,0,.1)"}
            /> */}
            <HeadingCard
              cardHeading="Location"
              handleEditPress={null}
              iconData={icons.location}
            >
              <Text>{user?.location?.address ?? "N/A"}</Text>
            </HeadingCard>
          </>
        )}
        {resumeName && (
          <>
            {/* <VerticalDivider
              height={6}
              width={"100%"}
              backgroundColor={"rgba(0,0,0,.1)"}
            /> */}
            <HeadingCard
              cardHeading="Resume Details"
              handleEditPress={null}
              iconData={icons.resumeOutlined}
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
          </>
        )}
      </View>
    </View>
  );
};

export default ProfileScreen;
