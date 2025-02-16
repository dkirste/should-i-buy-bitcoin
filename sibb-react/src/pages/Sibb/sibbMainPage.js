/*
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKSocialButton from "components/MKSocialButton";

// Material Kit 2 React examples
import SibbNavbar from "pages/Sibb/components/SibbNavbar";
import SibbFooter from "pages/Sibb/components/SibbFooter";

import FilledInfoCard from "examples/Cards/InfoCards/FilledInfoCard";

// Presentation page components

import BuiltByDevelopers from "pages/Presentation/components/BuiltByDevelopers";
// Routes
import routes from "routes";

import footerRoutes from "footer.routes";
// Images
import bgImage from "assets/sibb-images/background.jpg";
import SibbTokenButton from "./components/SibbTokenButton";
import { useEffect, useState } from "react";

import GetMoreInfo from "./components/SibbGetMoreInfo";

function SibbMainPage() {
  const [selectedToken, setSelectedToken] = useState("init");
  const [paymentStatus, setPaymentStatus] = useState("init");
  const [authStatus, setAuthStatus] = useState("notauthorized");
  const queryParameters = new URLSearchParams(window.location.search);

  useEffect(() => {
    // Update the document title using the browser API
    updateAuthStatus();
  });

  const updateAuthStatus = () => {
    const authStatus = queryParameters.get("auth");
    console.log(authStatus);
    setAuthStatus(authStatus);
  };

  const tokenSelector = () => {
    return (
      <Grid container item xs={12} lg={12} justifyContent="center" mx="auto">
        {" "}
        <MKTypography
          variant="h1"
          color="white"
          mt={-6}
          mb={5}
          fontWeight="bold"
        >
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
          ______?
        </MKTypography>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <SibbTokenButton
                content={{
                  tokenName: "Bitcoin",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <SibbTokenButton
                content={{
                  tokenName: "Ethereum",
                }}
              />
            </Grid>
            <Grid item xs={12} lg={4}>
              <SibbTokenButton
                content={{
                  tokenName: "Cosmos",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Grid>
    );
  };

  return (
    <>
      {authStatus === "c028825a9d39fab6a434950988f356624c6850b3" && (
        <>
          <SibbNavbar
            routes={routes}
            action={{
              type: "external",
              route: "http://localhost:3000/bitcoin",
              label: "Create your referral!",
              color: "info",
            }}
            sticky
            brand="Should I Buy Bitcoin?"
          />
          <MKBox
            minHeight="75vh"
            width="100%"
            sx={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "top",
              display: "grid",
              placeItems: "center",
              opacity: 0.9,
            }}
          >
            <Container>{tokenSelector()}</Container>
          </MKBox>
          <Card
            sx={{
              p: 2,
              mx: { xs: 2, lg: 3 },
              mt: -8,
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <Container sx={{ mt: 6 }}>
              <BuiltByDevelopers />
            </Container>
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={12} lg={4}>
                  <FilledInfoCard
                    variant="gradient"
                    color="info"
                    icon="flag"
                    title="Step 1: Choose asset and payment method"
                    description="Choose the crypto-asset you want to analyze and pay $1 to see the results."
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FilledInfoCard
                    color="info"
                    icon="precision_manufacturing"
                    title="Step 2: Analysis based on indicators"
                    description="Our algorithm analyzes the current market sentiment based on various indiciates and estimates market opportunities"
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FilledInfoCard
                    color="info"
                    icon="apps"
                    title="Step 3: Derivce you personal decision for action"
                    description="Check the result and in-depth analysis of various indicators in order to derive your buying/selling opportunity."
                  />
                </Grid>
              </Grid>
            </Container>
            <GetMoreInfo />
            <MKBox pt={18} pb={6}>
              <Container>
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    lg={5}
                    ml="auto"
                    sx={{ textAlign: { xs: "center", lg: "left" } }}
                  >
                    <MKTypography variant="h4" fontWeight="bold" mb={0.5}>
                      Thank you for your support!
                    </MKTypography>
                    <MKTypography variant="body1" color="text">
                      We deliver the best web products
                    </MKTypography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    lg={5}
                    my={{ xs: 5, lg: "auto" }}
                    mr={{ xs: 0, lg: "auto" }}
                    sx={{ textAlign: { xs: "center", lg: "right" } }}
                  >
                    <MKSocialButton
                      component="a"
                      href="https://twitter.com/intent/tweet?text=Check%20Material%20Design%20System%20made%20by%20%40CreativeTim%20%23webdesign%20%23designsystem%20%23mui5&amp;url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fmaterial-kit-react"
                      target="_blank"
                      color="twitter"
                      sx={{ mr: 1 }}
                    >
                      <i className="fab fa-twitter" />
                      &nbsp;Tweet
                    </MKSocialButton>
                    <MKSocialButton
                      component="a"
                      href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-kit-react"
                      target="_blank"
                      color="facebook"
                      sx={{ mr: 1 }}
                    >
                      <i className="fab fa-facebook" />
                      &nbsp;Share
                    </MKSocialButton>
                    <MKSocialButton
                      component="a"
                      href="https://www.pinterest.com/pin/create/button/?url=https://www.creative-tim.com/product/material-kit-react"
                      target="_blank"
                      color="pinterest"
                    >
                      <i className="fab fa-pinterest" />
                      &nbsp;Pin it
                    </MKSocialButton>
                  </Grid>
                </Grid>
              </Container>
            </MKBox>
          </Card>
          <MKBox pt={6} px={1} mt={6}>
            <SibbFooter content={footerRoutes} />
          </MKBox>
        </>
      )}
      {authStatus !== "c028825a9d39fab6a434950988f356624c6850b3" && (
        <>
          <h1>You are not authorized!</h1>
        </>
      )}
    </>
  );
}

export default SibbMainPage;
