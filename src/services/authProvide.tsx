import { appxx } from "@/firebase.config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GetServerSideProps } from "next";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import TokenManager from "./cookies";

type User = {
  name: string;
  password: string;
};

type Format = {
  dataFetch: string;
  setdataFetch: Function;
  authCheck: boolean;
  isAuth: Function;
};

export const AuthContext = createContext({} as Format);

export default function ProviderAuthContex({ children }: { children: any }) {
  const r = useRouter();
  const [dataFetch, setdataFetch] = useState("");
  const [authCheck, setauthCheck] = useState(false);
  // ===================================================
  async function isAuth(user: User) {
    const auth = getAuth(appxx);
    var temp = await signInWithEmailAndPassword(auth, user.name, user.password)
      .then((e) => {
        setauthCheck(true);
        TokenManager.setToken(e.user.uid!);
      })
      .catch((e) => {
        setauthCheck(false);
        TokenManager.setToken("");
      });
    return temp;
  }
  return (
    <>
      <AuthContext.Provider
        value={{ dataFetch, setdataFetch, authCheck, isAuth }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
