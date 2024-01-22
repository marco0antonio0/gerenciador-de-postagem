import TopBar from "@/components/topBarV2";
import TokenManager from "@/services/cookies";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const r = useRouter();
  useEffect(() => {
    var temp = TokenManager.getToken();
    if (!temp) {
      r.push("/login");
    }
  });
  return (
    <main className={`flex flex-col w-full`}>
      <Head>
        <title>pagina não encontrada</title>
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

      <TopBar state={[false, false, false]} />
      <div className="flex flex-col w-11/12 m-auto mb-5">
        <h1 className="flex m-auto my-0 text-5xl font-bold md:text-4xl mt-10 sml:text-3xl">
          Pagina não encontrada
        </h1>
        <span className="m-auto my-5 text-xl opacity-70 mt-3 sml:px-5 ">
          Explore o portifolio e veja muitos projetos magnificos, comece na
          pagina inicial !!
        </span>

        <div className="h-16 w-full  m-auto mt-10 flex flex-row text-white text-xl font-semibold lg:text-lg sm:text-base lg:h-14 sml:font-normal sml:text-sm">
          <div
            onClick={() => {
              r.push("/");
            }}
            className={` bg-gray-800 h-full flex m-auto cursor-pointer select-none active:scale-[1.05]  shadow-lg  sml:w-40 `}
          >
            <span className="px-16 m-auto md:px-12 sml:px-0 ">
              Ir para inicio
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
