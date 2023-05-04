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
import SibbCardFront from "./SibbCardFront";
import SibbCardBack from "./SibbCardBack";

function SibbTokenButton({ content }) {
  const { tokenName, setTokenFunction } = content;

  let Logo;
  if (tokenName.toLowerCase() === "bitcoin") {
    Logo = BitcoinLogo;
  } else if (tokenName.toLowerCase() === "ethereum") {
    Logo = EthereumLogo;
  } else if (tokenName.toLowerCase() === "cosmos") {
    Logo = CosmosLogo;
  }

  return (
    <RotatingCard>
      <SibbCardFront content={{ tokenName: tokenName }} />

      <SibbCardBack content={{ tokenName: tokenName }} />
    </RotatingCard>
  );
}

// Typechecking props for the DefaultFooter
SibbTokenButton.propTypes = {
  content: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  ).isRequired,
};

export default SibbTokenButton;
