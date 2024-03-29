import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TokenManager from "@/services/cookies";
import TopBar from "@/components/topBarV2";
import Markdown from "react-markdown";
import Head from "next/head";
type Data = {
  title: string;
  text: string;
};
export default function Home() {
  const [data, setdata] = useState<Data>({ title: "", text: "" });
  const [load, setload] = useState<boolean>(false);
  const [ViewState, setViewState] = useState<boolean>(false);
  const [cokieess, setcokieess] = useState("");

  const r = useRouter();
  const { t } = r.query;
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
    if (!load) {
      if (t) {
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
              setload(true);
              setdata({ title: e.data.title, text: e.data.text });
            } catch (error) {}
          });
      }
    }
  }, [cokieess, data, load, t]);

  return (
    <main className={`flex flex-col w-full  border-x-2 m-auto`}>
      <TopBar state={[false, false, false]} />
      <div
        className={`m-auto  w-8/12 h-auto  flex flex-col content-center align-middle items-center mdx:w-full `}
      >
        {/* ============================================================ */}
        <h1 className=" m-auto my-5 text-3xl  font-bold ">Editar - post</h1>
        {/*===================================== */}
        <div className="flex flex-row gap-3">
          {/* ============================================================ */}
          <Button
            text={`${ViewState ? "enable" : "disable"} view`}
            fn={() => {
              setViewState((e) => (e ? false : true));
            }}
            del={false}
          />
        </div>
        {/* ============================================================ */}
        {/*                 widget input >>> title */}
        <h3 className="w-10/12 m-auto px-5 py-3   ">title</h3>
        <input
          placeholder="digite . . ."
          value={data.title}
          type="text"
          className="h-auto w-10/12 border-2 m-auto my-0 px-5 py-3  "
          onChange={(e) =>
            setdata((data) => {
              return { ...data, ["title"]: e.target.value };
            })
          }
        />
        {/* ============================================================ */}
        {/*                 widget input >>> text */}
        {ViewState ? null : (
          <>
            <h3 className="w-10/12 m-auto px-5 py-3  ">text</h3>
            <textarea
              placeholder="digite . . ."
              value={data.text}
              rows={10}
              className="h-auto w-10/12 border-2 m-auto my-0 px-5 py-3"
              onChange={(e) =>
                setdata((data) => {
                  return { ...data, ["text"]: e.target.value };
                })
              }
            />
          </>
        )}

        {/* ============================================================ */}
      </div>
      <ViewEnable setdata={setdata} data={data} state={ViewState} />
      <div className="m-auto  w-8/12 h-auto  flex flex-col content-center align-middle items-center sm:w-full mb-10 mt-8">
        {/* ============================================================ */}
        {/*                 widget button >>> save */}

        <div className="flex flex-row gap-5">
          <Button
            del={false}
            text="save"
            fn={async () => {
              fetch("https://api-gestor.nova-work.cloud/api/update-post-main", {
                method: "POST",
                body: JSON.stringify({
                  title: data.title,
                  text: data.text,
                  authorization: cokieess,
                }),
              })
                .then((e: any) => {
                  return e.json();
                })
                .then((e: any) => {
                  try {
                    if (e.status) {
                      r.push("/post");
                    }
                  } catch (error) {}
                });
            }}
          />
        </div>
      </div>
    </main>
  );
}

function Button({
  fn,
  text,
  del,
}: {
  fn: Function;
  text: string;
  del: boolean;
}) {
  return (
    <div
      className={`w-36 h-14 ${
        del ? "bg-red-500" : " bg-green-300"
      } flex flex-col m-auto mt-0 mb-0 shadow-sm cursor-pointer select-none active:scale-[1.05]`}
      onClick={() => {
        fn();
      }}
    >
      <span className="m-auto text-white">{text}</span>
    </div>
  );
}

function ViewEnable({
  setdata,
  data,
  state,
}: {
  setdata: Function;
  data: Data;
  state: boolean;
}) {
  {
    return state ? (
      <>
        <div className="w-full flex flex-row gap-5 px-5 mdx:flex-col">
          <Head>
            <title>Editar post principal</title>
            <meta name="description" content="cms gestor de conteudos" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />

            <meta
              name="keywords"
              content="me adote Belém, adoção de animais em Belém, adotar cachorro em Belém, adotar gato em Belém, projeto de extensão adoção de animais em Belém"
            />
            <meta name="robots" content="index, follow" />
          </Head>
          {/* ================================================================= */}
          <div className="flex flex-col w-1/2 mdx:w-11/12 mdx:m-auto mdx:my-0 ">
            <h3 className="w-full m-auto px-5 py-3  mb-0 mt-0">text</h3>
            <textarea
              placeholder="digite . . ."
              value={data["text"]}
              rows={10}
              className="h-auto w-full border-2 m-auto my-0 px-5 py-3 mdx:mx-2"
              onChange={(e) =>
                setdata((data: Data) => {
                  return { ...data, ["text"]: e.target.value };
                })
              }
            />
          </div>
          {/* ================================================================= */}
          <div className="flex flex-col w-1/2 mdx:w-11/12 mdx:m-auto mdx:my-0">
            <h3 className="w-full m-auto px-5 py-3  mb-0 mt-0">Preview text</h3>
            <div className="w-full border-2 m-auto my-0 px-5 py-3 mt-0 mdx:mx-2">
              <Markdown className={"prose"}>{data.text}</Markdown>
            </div>
          </div>
          {/* ================================================================= */}
        </div>
      </>
    ) : null;
  }
}
