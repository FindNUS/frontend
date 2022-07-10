import { sendEmailVerification, User } from "firebase/auth";
import {
  APP_DEPLOYMENT_DEVELOPMENT,
  APP_DEPLOYMENT_PRODUCTION,
  DEPLOY_ENV,
} from "../constants";

export default function () {
  return (user: User) => {
    if (!user) return;
    sendEmailVerification(user, {
      url:
        DEPLOY_ENV === "production"
          ? APP_DEPLOYMENT_PRODUCTION
          : APP_DEPLOYMENT_DEVELOPMENT,
    });
  };
}
