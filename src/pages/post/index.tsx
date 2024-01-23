import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TokenManager from "@/services/cookies";
import TopBar from "@/components/topBarV2";
import Listitens from "@/components/ListItens";
import Head from "next/head";
export default function Home() {
  const [post, setpost] = useState({ data: [] });
  const [textPrincipal, settextPrincipal] = useState({ title: "" });
  const [load, setload] = useState<boolean>(true);
  const [load2, setload2] = useState<boolean>(true);
  const [cokieess, setcokieess] = useState("");
  const r = useRouter();
  useEffect(() => {
    var temp = TokenManager.getToken();
    setcokieess(temp!);
    if (!temp) {
      r.push("/login");
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
    if (load && cokieess) {
      fetch("https://api-gestor.nova-work.cloud/api/get-post", {
        method: "POST",
        body: JSON.stringify({
          authorization: cokieess,
        }),
      })
        .then((e: any) => {
          return e.json();
        })
        .then((e: any) => {
          try {
            setload(false);
            setpost(e.data);
          } catch (error) {}
        });
    }
    //
    if (load2 && cokieess) {
      fetch("https://api-gestor.nova-work.cloud/api/get-post-main", {
        method: "POST",
        body: JSON.stringify({
          authorization: cokieess,
        }),
      })
        .then((e: any) => {
          return e.json();
        })
        .then((e: any) => {
          try {
            setload2(false);
            settextPrincipal(e.data);
          } catch (error) {}
        });
    }
  }, [post, load, cokieess]);
  return (
    <main className={`flex flex-col w-full  border-x-2 m-auto`}>
      <Head>
        <title>Home</title>
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
      {/* ==================================================== */}
      {/*                Topbar components */}
      <TopBar />
      {/* ==================================================== */}
      <div className="m-auto  w-8/12 h-auto  flex flex-col content-center align-middle items-center sm:w-full">
        {/* ==================================================== */}
        {/*      Carregamento da lista de itens de 'post' */}
        {!load ? (
          <Listitens post={post} postPrincipal={textPrincipal} />
        ) : (
          <LoadInterface />
        )}
        {/* ==================================================== */}
      </div>
    </main>
  );
}

function LoadInterface() {
  return (
    <div className="m-auto my-20">
      <div className="border-t-4 border-blue-500 border-solid rounded-full animate-spin h-16 w-16"></div>
    </div>
  );
}
