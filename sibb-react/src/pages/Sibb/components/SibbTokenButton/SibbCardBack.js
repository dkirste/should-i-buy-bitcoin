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
import { useEffect, useState } from "react";
import Checkbox from "../../../../assets/theme/components/form/checkbox";
import { FormControlLabel } from "@mui/material";

function SibbCardBack({ content }) {
  const { tokenName } = content;
  const [AGBState, setAGBState] = useState(false);
  const [refCode, setRefCode] = useState("sibb");

  const queryParameters = new URLSearchParams(window.location.search);

  useEffect(() => {
    // Update the document title using the browser API
    const err = updateRefCode();
  });

  const updateRefCode = () => {
    const refCode = queryParameters.get("ref");
    if (refCode === null) {
      return "sibb";
    } else {
      setRefCode(refCode);
      console.log(refCode);
      return refCode;
    }
  };

  const retrieveNewSession = async () => {
    const res = await fetch(
      "http://85.214.130.182:5000/checkout/" + tokenName + "/" + refCode
    );
    return await res.json();
  };

  const triggerPayment = async () => {
    const sessionId = await retrieveNewSession();
    console.log(sessionId);
    window.location.href = sessionId.url;
  };

  const toggleAGBState = () => {
    setAGBState(!AGBState);
    return AGBState;
  };

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
            Choose your payment method!
          </MKTypography>
        </Container>

        <MKBox mx={5} pt={1} px={1} textAlign="center" lineHeight={2}>
          <MKButton
            variant="gradient"
            color="info"
            py={2}
            px={1}
            mx={1}
            fullWidth
            disabled={!AGBState}
          >
            Paypal
          </MKButton>
        </MKBox>
        <MKBox mx={5} py={1} px={1} textAlign="center" lineHeight={2}>
          <MKButton
            variant="gradient"
            color="info"
            py={1}
            px={1}
            mx={1}
            fullWidth
            disabled={!AGBState}
            onClick={triggerPayment}
          >
            Credit Card
          </MKButton>
        </MKBox>
        <MKBox pb={0} px={1} textAlign="center">
          <input type="checkbox" checked={AGBState} onChange={toggleAGBState} />
          <MKTypography
            px={1}
            py={1}
            variant="string"
            color="white"
            fontSize={13}
            //fontFamily='"Brush Script MT", "Helvetica", "Arial", sans-serif'
          >
            I have read and accept the ABG.
          </MKTypography>
        </MKBox>
      </MKBox>
    </MKBox>
  );
}

export default SibbCardBack;
