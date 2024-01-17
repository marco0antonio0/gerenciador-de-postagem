import { auth } from "@/firebase.config";
import { reauthenticateWithCredential } from "firebase/auth";
import { EmailAuthProvider } from "firebase/auth/cordova";

export default function ValidAuth({ password }: any) {
  try {
    let credential = EmailAuthProvider.credential(
      auth.currentUser?.email!,
      password
    );
    var temp = reauthenticateWithCredential(auth.currentUser!, credential)
      .then((result) => {
        return result;
        // User successfully reauthenticated. New ID tokens should be valid.
      })
      .catch((e) => {
        return false;
      });
    return temp;
  } catch (error) {
    return false;
  }
}
