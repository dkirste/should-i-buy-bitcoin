// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import BitcoinLogo from "../../../../assets/sibb-images/bitcoin_logo.png";
import EthereumLogo from "assets/sibb-images/ethereum_logo.png";
import CosmosLogo from "assets/sibb-images/cosmos_logo.png";
import Grid from "@mui/material/Grid";
import MKTypography from "../../../../components/MKTypography";
import Container from "@mui/material/Container";
import SibbTokenButton from "../SibbTokenButton";
import MKButton from "../../../../components/MKButton";

function SibbPaymentView({ content }) {
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
    <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
      {" "}
      <MKTypography variant="h1" color="white" mt={-6} mb={5} fontWeight="bold">
        Should I Buy&nbsp;
      </MKTypography>
      <MKTypography
        variant="h1"
        color="white"
        mt={-6}
        mb={5}
        fontWeight="bold"
        //fontFamily='"Brush Script MT", "Helvetica", "Arial", sans-serif'
        sx={[
          {
            backgroundcolor: "primary",
            backgroundImage: `linear-gradient(45deg, #c46be6, #64d0e7)`,
            backgroundSize: "100%",
            backgroundRepeat: "repeat",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          },
        ]}
      >
        {tokenName + "?"}
      </MKTypography>
      <Container>
        <MKBox
          color="white"
          bgColor="transparent"
          variant="contained"
          borderRadius="lg"
          shadow="lg"
          opacity={1}
          p={2}
          sx={{ p: 2, border: "1px solid white" }}
        >
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h4"
              color="white"
              mt={0}
              mb={0}
              fontWeight="bold"
            >
              Pay one dollar to see results :)
            </MKTypography>
            <Container>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={4}>
                  <MKButton>Paypal</MKButton>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <MKButton>Stribe</MKButton>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </MKBox>
      </Container>
    </Grid>
  );
}

// Typechecking props for the DefaultFooter
SibbPaymentView.propTypes = {
  content: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  ).isRequired,
};

export default SibbPaymentView;
