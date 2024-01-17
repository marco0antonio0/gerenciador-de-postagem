// import { auth, db } from "@/firebase.config";
// import TokenManager from "@/services/cookies";
// import { signOut } from "firebase/auth";
// import { useRouter } from "next/router";

// export default function TopBar() {
//   const r = useRouter();
//   return (
//     <>
//       <div className="h-28 w-full border-b-2 flex flex-row content-center items-center md:h-20">
//         {/* =============================================================================================== */}{" "}
//         {/* =============================================================================================== */}
//         <img
//           src="/img/logo-portifolio.png"
//           alt=""
//           className="ml-32 md:ml-16 sm:w-32"
//         />{" "}
//         {/* =============================================================================================== */}
//         <div className="flex flex-row gap-5 text-2xl ml-20 font-medium mt-5 md:text-xl md:ml-8">
//           <h3
//             className=" active:scale-[1.05]"
//             onClick={() => {
//               r.push("/post");
//             }}
//           >
//             incio
//           </h3>
//           <h3
//             className=" active:scale-[1.05]"
//             onClick={() => {
//               r.push(
//                 "https://github.com/marco0antonio0/gerenciador-de-postagem"
//               );
//             }}
//           >
//             github
//           </h3>
//         </div>
//         {/* =============================================================================================== */}
//         <div className="m-auto mr-32 md:mr-10">
//           <div
//             className=" m-auto bg-red-400 rounded cursor-pointer select-none active:scale-[1.05] shadow-sm "
//             onClick={() => {
//               signOut(auth)
//                 .then((e) => {
//                   TokenManager.setToken("");
//                   r.push("/login");
//                 })
//                 .catch((e) => {});
//             }}
//           >
//             <h3 className=" px-16 py-3 text-white md:px-14 md:py-3  smx:px-10">
//               sair
//             </h3>
//           </div>
//         </div>
//         {/* =============================================================================================== */}
//       </div>
//     </>
//   );
// }
