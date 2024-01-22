import { useRouter } from "next/router";

export default function Listitens({ post, postPrincipal }: any) {
  const r = useRouter();
  return (
    <div className="m-auto flex flex-col w-8/12  content-stretch gap-3 sm:w-full mt-10 sm:mt-5">
      <h1 className=" m-auto my-5 text-3xl  font-bold ">Texto principal</h1>
      {postPrincipal ? (
        <Item
          imgPath="/img/icon-edit.png"
          title={
            postPrincipal.title.length > 20
              ? postPrincipal.title.substring(0, 20) + "[...]"
              : postPrincipal.title
          }
          fn={() => {
            r.push("/post/searcht?t=" + "textoPrincipal");
          }}
        />
      ) : (
        <>
          <img src="/img/notfound.png" alt="" className="w-8/12 m-auto" />
        </>
      )}

      <h1 className=" m-auto my-5 text-3xl  font-bold ">Posts existentes</h1>
      {post ? (
        post.map((e: any, i: any) => (
          <Item
            key={i}
            imgPath="/img/icon-edit.png"
            title={
              e.title.length > 20
                ? e.title.substring(0, 20) + " [...]"
                : e.title
            }
            fn={() => {
              r.push("/post/search?t=" + e.key);
            }}
          />
        ))
      ) : (
        <>
          <img src="/img/notfound.png" alt="" className="w-8/12 m-auto" />
        </>
      )}
      <h1 className=" m-auto my-5 text-3xl  font-bold ">Funções</h1>
      <Item
        imgPath="/img/icon-new-post.jpg"
        title="adicionar post"
        fn={() => {
          r.push("/post/create");
        }}
      />
      <div className="h-20"></div>
    </div>
  );
}
function Item({
  title,
  fn,
  imgPath,
}: {
  title: string;
  fn: Function;
  imgPath: string;
}) {
  return (
    <div
      className="m-auto bg-white rounded-lg shadow-sm cursor-pointer active:scale-[1.05] flex flex-row border-2 border-gray-400 w-auto min-w-[400px] smx:min-w-[80%] select-none "
      onClick={() => {
        fn();
      }}
    >
      <h1 className="text-lg m-auto mr-0">{title}</h1>
      <img src={imgPath} alt="" className="h-16 w-16 m-auto ml-5 " />
    </div>
  );
}
