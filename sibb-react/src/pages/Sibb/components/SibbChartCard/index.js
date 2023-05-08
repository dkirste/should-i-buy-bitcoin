/**
 =========================================================
 * Material Kit 2 React - v2.0.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-kit-react
 * Copyright 2021 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

import EthereumLogo from "assets/sibb-images/ethereum_logo.png";
import SibbChart from "../SibbChart";

function SibbChartCard({ content }) {
  const { selectedToken, sessionId, metric_key, metric_title, metric_desc } =
    content;

  const cardActionStyles = {
    display: "flex",
    alignItems: "center",
    width: "max-content",

    "& .material-icons, .material-icons-round,": {
      transform: `translateX(2px)`,
      transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
    },

    "&:hover .material-icons, &:focus .material-icons, &:hover .material-icons-round, &:focus .material-icons-round":
      {
        transform: `translateX(6px)`,
      },
  };

  return (
    <Card
      sx={{
        backgroundImage: ({
          palette: { black },
          functions: { linearGradient, rgba },
        }) =>
          `${linearGradient(
            rgba(black.main, 0.1),
            rgba(black.main, 0.1)
          )}, url()`,
        backgroundSize: "cover",
      }}
    >
      <MKBox p={3}>
        <MKBox minHeight="20.625rem" my="auto" py={0}>
          <SibbChart
            selectedCoin={selectedToken}
            sessionId={sessionId}
            metric={metric_key}
          />
          <MKTypography
            variant="h4"
            color="black"
            sx={({ breakpoints, typography: { size } }) => ({
              [breakpoints.down("md")]: {
                fontSize: size["3xl"],
              },
            })}
          >
            {metric_title}
          </MKTypography>
          <MKTypography variant="body2" color="black" my={1}>
            {metric_desc}
          </MKTypography>
        </MKBox>
      </MKBox>
    </Card>
  );
}

export default SibbChartCard;
