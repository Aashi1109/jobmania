import Svg, { SvgProps, Path } from "react-native-svg";
const CheckboxIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#2F384C"
      d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12S6.201 22.5 12 22.5 22.5 17.799 22.5 12 17.799 1.5 12 1.5Z"
      opacity={0.32}
    />
    <Path
      fill="#2F384C"
      fillRule="evenodd"
      d="M23.53 2.47a.75.75 0 0 1 0 1.06l-11 11a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06L12 12.94 22.47 2.47a.75.75 0 0 1 1.06 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CheckboxIcon;
