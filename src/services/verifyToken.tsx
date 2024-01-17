import { auth, db } from "@/firebase.config";
import { get, ref } from "firebase/database";
import TokenManager from "./cookies";

export default async function VeryfyByToken() {
  var token = TokenManager.getToken();
  try {
    var reff = ref(db, "users/" + token + "/email");

    var temp = await get(reff).then((e) => (e.exists() ? e.val() : null));
    return temp;
  } catch (error) {
    return null;
  }
}
