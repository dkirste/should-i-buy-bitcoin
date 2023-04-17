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

function SibbCardFront({ content }) {
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
      alignContent="center"
      borderRadius="lg"
      coloredShadow="green"
      width="100%"
      position="relative"
      zIndex={2}
      bgColor={"transparent"}
      sx={{
        backgroundImage: ({
          palette: { gradients },
          functions: { linearGradient, rgba },
        }) =>
          `${linearGradient(
            rgba("000000", 0.7),
            rgba("000000", 0.9)
          )}, url(${Logo})`,
        backgroundSize: "cover",
        backfaceVisibility: "hidden",
        height: pxToRem(224),
      }}
    >
      <MKBox py={2} px={3} textAlign="center" lineHeight={1}>
        <Container>
          <MKBox
            component="img"
            pt={2}
            pb={2}
            src={Logo}
            alt={tokenName + " logo"}
            height={pxToRem(96)}
            position="relative"
          />
        </Container>

        <MKTypography
          variant="p"
          color="white"
          fontWeight="bold"
          //fontFamily='"Brush Script MT", "Helvetica", "Arial", sans-serif'
        >
          Hier könnte ihr Text stehen :))
        </MKTypography>
      </MKBox>
    </MKBox>
  );
}

export default SibbCardFront;
