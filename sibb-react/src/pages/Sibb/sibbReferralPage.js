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
import MKButton from "../../components/MKButton";

function SibbReferralPage() {
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
          <Card
            sx={{
              p: 2,
              pt: 15,
              mx: { xs: 2, lg: 3 },
              mt: -8,
              mb: 4,
              backgroundColor: ({ palette: { white }, functions: { rgba } }) =>
                rgba(white.main, 0.8),
              backdropFilter: "saturate(200%) blur(30px)",
              boxShadow: ({ boxShadows: { xxl } }) => xxl,
            }}
          >
            <Container>
              <Grid container pt={10} spacing={3}>
                <Grid item xs={12} lg={4}>
                  <FilledInfoCard
                    variant="gradient"
                    color="info"
                    icon="flag"
                    title="Schritt 1: Kontaktiere uns per Email"
                    description="Kontaktiere uns per Mail und gebe alle benötigten Daten an. Hierfür brauchst du einen Wohnsitz in Deutschland und deine Zielpublikum muss primär im deutschen Markt sein."
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FilledInfoCard
                    color="info"
                    icon="precision_manufacturing"
                    title="Schritt 2: Wir prüfen deine Daten"
                    description="Wir prüfen intern deine Daten und melden uns sobald die Prüfung abgeschlossen ist."
                  />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <FilledInfoCard
                    color="info"
                    icon="apps"
                    title="Schritt 3: Du wirbst Kunden"
                    description="Wir senden dir deinen Referral Code mit entsprechendem Link zu, den du zukünftig verwenden kannst."
                  />
                </Grid>
              </Grid>

              <MKBox component="section" py={{ xs: 0, sm: 12 }}>
                <MKBox
                  variant="gradient"
                  bgColor="dark"
                  position="relative"
                  borderRadius="xl"
                  sx={{ overflow: "hidden" }}
                >
                  <MKBox
                    component="img"
                    src={bgImage}
                    alt="pattern-lines"
                    position="absolute"
                    top={0}
                    left={0}
                    width="100%"
                    zIndex={1}
                    opacity={0.2}
                  />
                  <Container sx={{ position: "relative", zIndex: 2, py: 12 }}>
                    <Grid
                      container
                      item
                      xs={12}
                      md={7}
                      justifyContent="center"
                      mx="auto"
                      textAlign="center"
                    >
                      <MKTypography variant="h3" color="white">
                        Erstelle deinen eigenen Referral Code!
                      </MKTypography>
                      <MKTypography variant="body2" color="white" mb={6}>
                        Kontaktiere uns per Email und stelle uns folgende
                        Informationen bereit: Vorname, Nachname, Gewünschter
                        Code...
                      </MKTypography>
                      <MKButton
                        variant="gradient"
                        color="info"
                        size="large"
                        component="a"
                        href="mailto:manish@example.com?subject=Create my referral code!&body=Hallo SIBB Team,%0D%0ABitte erstellt einen Referral code für mich!%0D%0AMeine Daten sind:%0D%0AVorname:%0D%0ANachname:%0D%0AGewünschter Referral Code:"
                        sx={{ mb: 2 }}
                      >
                        Erstelle meinen Referral Code!
                      </MKButton>
                    </Grid>
                  </Container>
                </MKBox>
              </MKBox>
            </Container>
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

export default SibbReferralPage;
