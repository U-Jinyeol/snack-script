import { WebClient } from "@slack/web-api";
import { slackConfig } from "../config/slack.config.js";

const botClient = new WebClient(slackConfig.apiKey);
const channelId = slackConfig.channel;

const sendMessageToSlack = async (sender, message) => {
  try {
    await botClient.chat.postMessage({
      channel: channelId,
      text: "<@슬랙 멤버 아이디> 채널에 메시지를 보내는 예시입니다.",
    });

    console.log("메시지 전송 완료");
  } catch (error) {
    console.log("오류가 발생했습니다.");
    console.error(error);
  }
};

export default { sendMessageToSlack };
