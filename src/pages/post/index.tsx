import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TokenManager from "@/services/cookies";
import TopBar from "@/components/topBarV2";
import Listitens from "@/components/ListItens";
import { getPost, getPostByKey } from "@/services/post";
import VeryfyByToken from "@/services/verifyToken";
import { auth } from "@/firebase.config";
export default function Home() {
  const [tentativas, settentativas] = useState<number>(0);
  const [post, setpost] = useState([]);
  const [textPrincipal, settextPrincipal] = useState([]);
  const [load, setload] = useState<boolean>(true);
  const r = useRouter();
  const maxTentativas = 5;
  useEffect(() => {
    var temp = TokenManager.getToken();
    if (!temp) {
      r.push("/login");
    }
    if (load || tentativas < maxTentativas) {
      VeryfyByToken().then((e) => {
        if (e) {
          getPostByKey("textoPrincipal", { prefix: "/" })
            .then((e: any) => {
              console.log(e);
              settextPrincipal(e);
            })
            .catch((e) => {
              settextPrincipal([]);
            })
            .catch((e) => {});

          getPost()
            .then((e: any) => {
              setpost(e);
              setload(false);
              settentativas((e: number) => {
                var instance = 1 + e;
                return instance;
              });
            })
            .catch((e) => {
              settentativas((e: number) => {
                var instance = 1 + e;
                return instance;
              });

              setload(false);
              setpost(e);
            });
        }
      });
    }
  }, [post, load]);
  return (
    <main className={`flex flex-col w-full  border-x-2 m-auto`}>
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
