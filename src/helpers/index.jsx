import moment from "moment";

export const getDate = (date) => {
  return moment(date).format("DD-MM-YYYY");
};
export const getDates = (date) => {
  return moment(date).format("YYYY-MM-DD");
};
export const getTime = (date) => {
  return moment(date).format("HH:mm");
};

export const getAgo = (date) => {
  return moment(date).fromNow(true);
};
const token = process.env.REACT_APP_IMAGE_TOKEN;
export const link = process.env.REACT_APP_IMAGE_URL;
export const suffix = `?alt=media&token=${token}`;

export const getImage = (url) => {
  return `https://firebasestorage.googleapis.com/v0/b/mile-12-fdf33.appspot.com/o/${encodeURIComponent(
    url
  )}?alt=media&token=ed5ea058-86e6-4377-9c35-0a771cfa75e3`;
  // url ? `${link}${encodeURIComponent(url)}${suffix}` : null;
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
