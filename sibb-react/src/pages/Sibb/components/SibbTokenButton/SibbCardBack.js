// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import rgba from "../../../../assets/theme/functions/rgba";
import BitcoinLogo from "../../../../assets/sibb-images/bitcoin_logo.png";
import EthereumLogo from "assets/sibb-images/ethereum_logo.png";
import CosmosLogo from "assets/sibb-images/cosmos_logo.png";
import pxToRem from "../../../../assets/theme/functions/pxToRem";
import MKButton from "../../../../components/MKButton";
import RotatingCard from "../../../../examples/Cards/RotatingCard";
import RotatingCardBack from "../../../../examples/Cards/RotatingCard/RotatingCardBack";
import MKTypography from "../../../../components/MKTypography";
import Container from "@mui/material/Container";

function SibbCardBack({ content }) {
  const { tokenName } = content;
  let Logo;

  if (tokenName.toLowerCase() === "bitcoin") {
    Logo = BitcoinLogo;
  } else if (tokenName.toLowerCase() === "ethereum") {
    Logo = EthereumLogo;
  } else if (tokenName.toLowerCase() === "cosmos") {
    Logo = CosmosLogo;
  }

  return (
    <MKBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="lg"
      coloredShadow="green"
      position="absolute"
      width="100%"
      height="100%"
      top={0}
      left={0}
      zIndex={5}
      sx={{
        backgroundImage: ({ functions: { linearGradient, rgba } }) =>
          `${linearGradient(
            rgba("000000", 0.7),
            rgba("000000", 0.9)
          )}, url(${Logo})`,
        backgroundSize: "cover",
        backfaceVisibility: "hidden",
        transform: "rotateY(180deg)",
        height: pxToRem(224),
      }}
    >
      <MKBox py={2} px={1} textAlign="center" lineHeight={1}>
        <Container py={2}>
          <MKTypography
            py={2}
            variant="p"
            color="white"
            fontWeight="bold"
            //fontFamily='"Brush Script MT", "Helvetica", "Arial", sans-serif'
          >
            Pay one dollar via Stribe or Paypal to see results!
          </MKTypography>
        </Container>
        <MKBox py={2} px={1} textAlign="center" lineHeight={1}>
          <MKButton py={2} px={1} mx={1}>
            Paypal
          </MKButton>
          <MKButton py={2} px={1} mx={1}>
            Stribe
          </MKButton>
        </MKBox>
      </MKBox>
    </MKBox>
  );
}

export default SibbCardBack;
