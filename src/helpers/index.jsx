import dayjs from "dayjs";
import moment from "moment";

export const getDate = (date) => {
  return dayjs(date).format("MM-DD-YYYY");
  // return moment(date).format("DD-MM-YYYY");
};
export const getDates = (date) => {
  return moment(date).format("YYYY-MM-DD");
};
export const getTime = (date) => {
  return moment(date).format("h:mm A");
};
export const shortText = (text) => {
  let word = text.slice(0, 8);
  return `${word}...`;
};
export const getAgo = (date) => {
  return moment(date).fromNow(true);
};
const token = process.env.REACT_APP_IMAGE_TOKEN;
export const link = process.env.REACT_APP_IMAGE_URL;
export const suffix = `?alt=media&token=${token}`;

export const getImage = (url) => {
  return url ? `${link}${encodeURIComponent(url)}${suffix}` : null;
};

export const getTimeMoment = (startDate) => {
  const durationObj = moment.duration(
    moment(new Date()).diff(moment(startDate))
  );

  if (durationObj.asMonths() >= 1) {
    return durationObj.asMonths().toFixed(0) + "M";
  } else if (durationObj.asDays() >= 1) {
    return durationObj.asDays().toFixed(0) + "d";
  } else if (durationObj.asDays() >= 7) {
    return durationObj.asWeeks().toFixed(0) + "w";
  } else if (durationObj.asHours() >= 1) {
    return durationObj.asHours().toFixed(0) + "h";
  } else if (durationObj.asMinutes() > 1) {
    return durationObj.asMinutes().toFixed(0) + "m ";
  } else if (durationObj.asSeconds() >= 1) {
    return durationObj.asSeconds().toFixed(0) + "s ";
  }
  return "now";
};
export const getConfig = ({ email, reference, amount }) => {
  return {
    reference,
    email,
    amount: amount * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
  };
};

export const capitalize = (str) => {
  return str ? str?.charAt(0)?.toUpperCase() + str?.slice(1) : null;
};
