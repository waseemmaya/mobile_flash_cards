import { Notifications } from "expo";
import { Platform, AsyncStorage } from "react-native";
import * as Permissions from "expo-permissions";
import { getLastAttempted } from "./storageHelper";
import { getFullDate } from "./dateHelper";

let lastAttemptedDate = "lastAttemptedDate";

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(lastAttemptedDate).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
};

const isQuizAttempted = async () => {
  let lastAttempt = await getLastAttempted();

  if (!lastAttempt) {
    return false;
  }

  let today = getFullDate(new Date());

  return lastAttempt === today ? true : false;
};

export const initNotification = async () => {
  try {
    // We need to ask for Notification permissions for ios devices
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (result.status === "granted") {
      console.log("Notification permissions granted.");

      const handleNotification = async ({ notificationId }) => {
        let quizAttempted = await isQuizAttempted();
        console.log("quizAttempted: ", quizAttempted);

        if (quizAttempted) {
          Notifications.dismissNotificationAsync(notificationId);
        }
      };

      Notifications.addListener(handleNotification);

      if (Platform.OS === "android") {
        Notifications.createChannelAndroidAsync("quiz-channel", {
          name: "quiz-channel",
          sound: true,
          vibrate: true,
          priority: "max",
        });
      }

      const currentDate = new Date();

      const localNotification = {
        title: "Reminder for Quiz",
        body: `Hey!, buddy? You have not attemeted any quiz today! Today is ${currentDate.getDate()}/${
          currentDate.getMonth() + 1
        }/${currentDate.getFullYear()} `,
        ios: { sound: true },
        android: {
          channelId: "quiz-channel",
          color: "#2A89FF",
        },
      };

      let notificationTime = new Date();
      let currTime = notificationTime.getTime();
      // night 11 pm
      notificationTime.setHours(23, 0, 0);
      let scheduleTime = notificationTime.getTime();
      if (currTime > scheduleTime) {
        scheduleTime = scheduleTime + 86400000;
      }

      const schedulingOptions = {
        time: scheduleTime,
        repeat: "day",
        // time: new Date().getTime() + Number(5),
      };

      Notifications.scheduleLocalNotificationAsync(
        localNotification,
        schedulingOptions
      );
      console.log("Notification scheduled successfully!");
    }
  } catch (error) {
    console.log("error: ", error);
  }
};
