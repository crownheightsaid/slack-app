import React, { useContext } from "react";
import { Popup } from "react-mapbox-gl";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "react-i18next";
import CloseIcon from "@material-ui/icons/Close";
import sharedStylesFn from "webapp/style/sharedStyles";
import DaysOpenChip from "./DaysOpenChip";
<<<<<<< HEAD
import HouseholdSizeChip from "./HouseholdSizeChip";
import DrivingClusterChip from "./DrivingClusterChip";
import { daysSinceSlackMessage } from "../helpers/time";
import ClusterMapContext from "../context/ClusterMapContext";
=======
import getParam from "../helpers/utils";

const daysSinceSlackMessage = (slackTs) => {
  const datePosted = fromUnixTime(Number(slackTs));
  return differenceInDays(new Date(), datePosted);
};
>>>>>>> hide claim delivery ui behind URL param

const useStyles = makeStyles((theme) => ({
  ...sharedStylesFn(theme),
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  closeIcon: {
    cursor: "pointer",
    position: "absolute",
    right: 0,
    top: 0,
  },
  root: {
    position: "relative",
  },
  chipRow: {
    "& > *": {
      marginRight: theme.spacing(0.5),
    },
    marginTop: theme.spacing(2),
  },
  ctaTooltipButton: {
    backgroundColor: "dodgerblue",
    color: "white",
    justifySelf: "right",
  },
}));

const RequestPopup = ({ requests, closePopup }) => {
  const deliveryContext = useContext(DeliveryContext);
  const classes = useStyles();
  const { t: str } = useTranslation();
<<<<<<< HEAD
  const { _focusedRequestId, setFocusedRequestId } = useContext(
    ClusterMapContext
  );
=======
  const showSmsPickup = getParam("sms_pickup") === "true";
>>>>>>> hide claim delivery ui behind URL param

  return (
    <Popup
      coordinates={requests[0].lngLat}
      offset={{
        "bottom-left": [6, -19],
        bottom: [0, -19],
        "bottom-right": [-6, -19],
      }}
    >
      {requests.map(({ meta }, i) => (
        <Box
          key={meta.Code}
          className={classes.root}
          onClick={() => {
            setFocusedRequestId(meta.Code);
          }}
        >
          <CloseIcon
            onClick={closePopup}
            fontSize="small"
            className={classes.closeIcon}
          />
          <Typography variant="h6">
            {meta.slackPermalink ? (
              <Link
                href={meta.slackPermalink}
                underline="always"
                target="_blank"
              >
                {meta["First Name"]}
              </Link>
            ) : (
              meta["First Name"]
            )}
          </Typography>

          <Typography variant="body1">
            {meta["Cross Street #1"]}
            {" and "}
            {meta["Cross Street #2"]}
          </Typography>

          <Typography variant="body2">
            {str("webapp:deliveryNeeded.popup.requestCode", {
              defaultValue: `Request code:`,
              // eslint-disable-next-line react/jsx-one-expression-per-line
            })}{" "}
            {meta.Code}
          </Typography>

          <Box className={classes.chipRow}>
            <HouseholdSizeChip size={meta["Household Size"]} />

            {meta["For Driving Clusters"] && <DrivingClusterChip />}

            {showSmsPickup && (
              <Button
                variant="contained"
                size="small"
                onClick={() => deliveryContext.handleOpenClaimDialog(meta.Code)}
                className={classes.ctaTooltipButton}
              >
                <Typography variant="button">
                  {str("webapp:deliveryNeeded.popup.claimDelivery", {
                    defaultValue: "Claim delivery",
                  })}
                </Typography>
              </Button>
            )}

            {meta.slackPermalink ? (
              <DaysOpenChip daysOpen={daysSinceSlackMessage(meta.slackTs)} />
            ) : (
              <Typography variant="body2" color="error">
                {str(
                  "webapp:deliveryNeeded.popup.cantFindSlack",
                  `Can't find Slack link, please search for request code in Slack.`
                )}
              </Typography>
            )}
          </Box>

          {i !== requests.length - 1 && <Divider className={classes.divider} />}
        </Box>
      ))}
    </Popup>
  );
};

export default RequestPopup;
