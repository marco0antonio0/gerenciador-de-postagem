import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TokenManager from "@/services/cookies";
import Head from "next/head";
export default function Home() {
  const [post, setpost] = useState([]);
  const r = useRouter();
  useEffect(() => {
    var temp = TokenManager.getToken();
    if (!temp) {
      r.push("/login");
    } else {
      r.push("/post");
    }
    //
    //
    fetch("https://api-gestor.nova-work.cloud/api/verify-token", {
      method: "POST",
      body: JSON.stringify({ authorization: temp }),
    })
      .then((e) => e.json())
      .then((e) => {
        if (e.validate == false) {
          TokenManager.setToken("");
          r.push("/login");
        }
      })
      .catch((e) => {
        TokenManager.setToken("");
        r.push("/login");
      });
    //
    //
  }, [post]);
  return (
    <main
      className={`flex flex-col w-10/12 h-screen prose border-x-2 border-black m-auto`}
    >
      <Head>
        <title>home</title>
        <meta name="description" content="cms gestor de conteudos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        <meta
          name="keywords"
          content="me adote Belém, adoção de animais em Belém, adotar cachorro em Belém, adotar gato em Belém, projeto de extensão adoção de animais em Belém"
        />
        <meta name="robots" content="index, follow" />
      </Head>
    </main>
  );
}
