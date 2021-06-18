import moment from "moment";

const formatMessage = (username, userId, text) => {
  return {
    username,
    userId,
    text,
    time: moment().format("h:mm a"),
  };
};

module.exports = formatMessage;
