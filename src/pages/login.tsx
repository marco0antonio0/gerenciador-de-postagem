import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/services/authProvide";
import TokenManager from "@/services/cookies";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const { isAuth, authCheck } = useContext(AuthContext);
  const [data, setdata] = useState({ name: "", password: "" });
  const [post, setpost] = useState();
  const [err, seterr] = useState({ name: false, password: false });
  const [errCredentials, seterrCredentials] = useState(false);
  const [errRe, seterrRe] = useState(false);

  const r = useRouter();
  useEffect(() => {
    var temp = TokenManager.getToken();
    if (temp) {
      r.push("/");
    }
  });

  function fn() {
    // console.log(data);
    if (!err.name && !err.password) {
      isAuth(data);
      if (!authCheck) {
        seterrCredentials(true);
      }
    } else {
      console.log(err);
    }
  }

  return (
    <main
      className={`flex flex-col max-w-[500px] h-screen prose border-x-2 border-grey-400 m-auto sm:w-full`}
    >
      <form
        onError={() => {}}
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          fn();
        }}
        className="m-auto flex flex-col w-full mt-40 sm:mt-28"
      >
        {/* ============================================== */}
        <img
          src="/img/logo-portifolio.png"
          alt=""
          className="w-[200px] m-auto sm:w-[150px]"
        />
        {/* ============================================== */}
        <ComponentsInput
          placeholder="email"
          type="email"
          err={err.name}
          txt="Email"
          fn={(e: any) => {
            setdata((y) => {
              return {
                ...y,
                ["name"]: e.target.value,
              };
            });

            seterr((r) => {
              return { ...r, ["name"]: e.target.value.length <= 0 };
            });
            seterrCredentials(false);
          }}
        />
        {/* ============================================== */}
        <ComponentsInput
          placeholder="*********"
          type="password"
          err={err.password}
          txt="Senha"
          fn={(e: any) => {
            setdata((y) => {
              return {
                ...y,
                ["password"]: e.target.value,
              };
            });
            seterr((r) => {
              return { ...r, ["password"]: e.target.value.length <= 0 };
            });
            seterrCredentials(false);
          }}
        />

        {/* ============================================== */}
        {errCredentials ? (
          <span className="m-auto mt-5 text-red-400">
            Email ou Senha incorretos
          </span>
        ) : null}
        {/* ============================================== */}
        <Button
          text="Login"
          fn={async () => {
            fn();
          }}
        />
        {/* ============================================== */}
      </form>
    </main>
  );
}

function Button({ fn, text }: { fn: Function; text: string }) {
  return (
    <button
      type="submit"
      className="w-36 h-14 bg-blue-400 flex flex-col m-auto mt-10 mb-0 shadow-sm cursor-pointer select-none active:scale-[1.05]"
      onClick={() => {
        fn();
      }}
    >
      <span className="m-auto text-white">{text}</span>
    </button>
  );
}

function ComponentsInput({
  err = false,
  fn,
  txt,
  type,
  placeholder,
}: {
  err: boolean;
  txt: string;
  fn: Function;
  type: string;
  placeholder: string;
}) {
  return (
    <>
      <Head>
        <title>Login</title>
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
      <h3
        className={`sm:font-normal sm:mt-4 sm:mb-1 m-auto mb-3 ml-10 mt-5 ${
          err ? "text-red-400" : ""
        }`}
      >
        {txt}
      </h3>
      <input
        minLength={6}
        type={type}
        className={`h-12 w-10/12 border-2 m-auto my-0 px-5 ${
          err ? "border-red-200" : ""
        }  `}
        placeholder={placeholder}
        onChange={(e) => fn(e)}
      />
      {err ? (
        <span className="ml-16 text-red-400">
          {txt + " não preenchido ou invalido(a)"}
        </span>
      ) : null}
    </>
  );
}
