// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import rgba from "../../assets/theme/functions/rgba";
import BitcoinLogo from "../../assets/sibb-images/bitcoin_logo.png";
import EthereumLogo from "assets/sibb-images/ethereum_logo.png";
import CosmosLogo from "assets/sibb-images/cosmos_logo.png";
import pxToRem from "../../assets/theme/functions/pxToRem";
import MKButton from "../MKButton";

function SibbTokenButton({ content }) {
  const { tokenName } = content;
  let Logo;

  if (tokenName === "bitcoin") {
    Logo = BitcoinLogo;
  } else if (tokenName === "ethereum") {
    Logo = EthereumLogo;
  } else if (tokenName === "cosmos") {
    Logo = CosmosLogo;
  }

  return (
    <MKButton
      variant="outlined"
      color="white"
      fullWidth={true}
      sx={[
        {
          background: rgba(0, 0),
        },
        {
          "&:hover": {
            color: "white", // Color with click
            backgroundColor: "white", // Color when hovering
            background: rgba("FFFFFF", 0.2),
          },
        },
      ]}
    >
      <MKBox
        component="img"
        src={Logo}
        alt={tokenName + " logo"}
        height={pxToRem(64)}
        position="relative"
      />
    </MKButton>
  );
}

// Typechecking props for the DefaultFooter
SibbTokenButton.propTypes = {
  content: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  ).isRequired,
};

export default SibbTokenButton;
