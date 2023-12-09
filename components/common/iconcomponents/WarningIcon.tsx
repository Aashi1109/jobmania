import Svg, { SvgProps, Path } from "react-native-svg";
const WarningIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#2F384C"
      d="M18.98 7.93C16.7 3.855 15.558 1.818 14.058 1.14a5 5 0 0 0-4.116 0c-1.5.678-2.64 2.715-4.922 6.788l-1.63 2.912C1.196 14.757.1 16.715.282 18.318a5 5 0 0 0 2.045 3.489c1.31.943 3.553.943 8.041.943h3.262c4.488 0 6.732 0 8.041-.943a5 5 0 0 0 2.045-3.489c.183-1.603-.913-3.56-3.106-7.477L18.98 7.93Z"
      opacity={0.32}
    />
    <Path
      fill="#2F384C"
      fillRule="evenodd"
      d="M12 8.25a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm-1.25 8.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default WarningIcon;
