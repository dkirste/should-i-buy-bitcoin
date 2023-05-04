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

// Routes
import routes from "routes";

import footerRoutes from "footer.routes";
// Images
import bgImage from "assets/sibb-images/background.jpg";
import { useEffect, useState } from "react";

import SibbChartCard from "./components/SibbChartCard";

function SibbResults() {
  const [selectedToken, setSelectedToken] = useState("init");
  const [paymentStatus, setPaymentStatus] = useState("init");
  const queryParameters = new URLSearchParams(window.location.search);

  useEffect(() => {
    // Update the document title using the browser API
    const err = updatePaymentStatus();
  });

  const updatePaymentStatus = async () => {
    const sessionId = getUrlSessionId();
    let status = "unpaid";
    if (sessionId !== undefined) {
      const res = await fetch(
        "http://127.0.0.1:5000/checkpayment/" + sessionId
      );
      const resString = await res.json();
      console.log(resString);
      status = resString.status;
    }

    if (status === "paid") {
      setPaymentStatus("paid");
    } else {
      setPaymentStatus("unpaid");
    }
  };

  const getUrlSessionId = () => {
    const sessionId = queryParameters.get("id");
    console.log(sessionId);
    return sessionId;
  };

  const chartData = () => {
    const sessionId = getUrlSessionId();
    return (
      <MKBox my={0} py={0}>
        <Grid container spacing={0} sx={{ mb: 3 }}>
          <Grid item mr={0} xs={12} lg={3}>
            <MKBox position="sticky" top="100px" pb={{ xs: 2, lg: 6 }}>
              <MKTypography variant="h3" fontWeight="bold" mb={1}>
                Oscillating indicators
              </MKTypography>
              <MKTypography
                variant="body2"
                fontWeight="regular"
                color="secondary"
                mb={1}
                pr={2}
              >
                These indicators are oscillating and generate signals :)
              </MKTypography>
            </MKBox>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <SibbChartCard
                  content={{
                    selectedCoin: "bitcoin",
                    sessionId: { sessionId },
                    metric_key: "rsi_value",
                    metric_title: "RSI",
                    metric_desc: "Relative Strength Index (14)",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <SibbChartCard
                  content={{
                    selectedCoin: "bitcoin",
                    sessionId: { sessionId },
                    metric_key: "stoch_k_value",
                    metric_title: "Stochastic %K",
                    metric_desc: "Stochastic %K description",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <SibbChartCard
                  content={{
                    selectedCoin: "bitcoin",
                    sessionId: { sessionId },
                    metric_key: "cci_value",
                    metric_title: "Commodity Channel Index",
                    metric_desc: "Commodity Channel Index (20) description",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6} sx={{ mb: 2 }}>
                <SibbChartCard
                  content={{
                    selectedCoin: "bitcoin",
                    sessionId: { sessionId },
                    metric_key: "adx_value",
                    metric_title: "Average Directional Index (14)",
                    metric_desc: "Average Directional Index description",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MKBox>
    );
  };

  const resultSlogan = () => {
    return (
      <MKTypography variant="h1" color="white" fontWeight="bold" mb={0.5}>
        Yes, you should buy {selectedToken}!
      </MKTypography>
    );
  };

  return (
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
        minHeight="50vh"
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
        {paymentStatus === "init" && (
          <Container>
            <MKTypography variant="h1" color="white" fontWeight="bold" mb={0.5}>
              Waiting for payment...
            </MKTypography>
          </Container>
        )}
        {paymentStatus === "paid" && <Container>{resultSlogan()}</Container>}
        {paymentStatus === "unpaid" && (
          <Container>
            <MKTypography variant="h1" color="white" fontWeight="bold" mb={0.5}>
              Return to homepage to see results!
            </MKTypography>
          </Container>
        )}
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
        <MKBox my={6} py={6}>
          {paymentStatus === "paid" && (
            <Container sx={{ mt: 6 }}>{chartData()}</Container>
          )}
        </MKBox>
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
  );
}

export default SibbResults;
