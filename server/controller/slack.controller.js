import axios from "axios";

const sendMessageToSlack = async (message) => {
  try {
    const response = await axios.post(
      "https://slack.com/api/chat.postMessage",
      {
        channel: process.env.SLACK_CHANNEL,
        text: message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_API_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error.message);
  }
};

export default { sendMessageToSlack };
