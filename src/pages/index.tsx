import { useEffect, useState } from "react";
import { auth, db } from "@/firebase.config";
import { get, push, ref, set } from "firebase/database";
import { useRouter } from "next/router";
import TokenManager from "@/services/cookies";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { createPost, getPost } from "@/services/post";
import ValidAuth from "@/services/reauthenticate";
import VeryfyByToken from "@/services/verifyToken";
export default function Home() {
  const [data, setdata] = useState("");
  const [post, setpost] = useState([]);
  const [load, setload] = useState<boolean>(true);
  const r = useRouter();
  useEffect(() => {
    var temp = TokenManager.getToken();
    if (!temp) {
      r.push("/login");
    } else {
      r.push("/post");
    }
  }, [post]);
  return (
    <main
      className={`flex flex-col w-10/12 h-screen prose border-x-2 border-black m-auto`}
    ></main>
  );
}
