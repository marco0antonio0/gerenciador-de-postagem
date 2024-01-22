import { db } from "@/firebase.config";
import { get, push, ref, remove, set, update } from "firebase/database";
import { deleteDoc } from "firebase/firestore";
type User = {
  name: string;
};
type Data = {
  title: string;
  text: string;
};
// criar um post com os dados fornecidos
function createPost({ data }: { data: Data }) {
  try {
    const reff = ref(db, "post/");
    if (data.title && data.text) {
      push(reff, {
        title: data.title,
        text: data.text,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
function transformarEmLista(objeto: {
  [key: string]: { text: string; title: string };
}): { key: string; text: string; title: string }[] {
  return Object.entries(objeto).map(([key, value]) => ({ key, ...value }));
}
// recupera todos os dados e transforma em lista
async function getPost() {
  return new Promise((resolve, reject) => {
    var reff = ref(db, "post/");
    get(reff)
      .then((e) => {
        if (e.exists()) {
          resolve(transformarEmLista(e.val()));
        } else {
          reject(null);
        }
      })
      .catch((e) => {
        reject(null);
      });
  });
}
// recupera apenas o dado fornecido pela key
async function getPostByKey(key: string, { prefix }: { prefix: string }) {
  return new Promise((resolve, reject) => {
    var reff = ref(db, prefix + key);
    get(reff)
      .then((e) => {
        if (e.exists()) {
          resolve(e.val());
        } else {
          reject(null);
        }
      })
      .catch((e) => {
        reject(null);
      });
  });
}

// atualiza o dado indicado pela key
async function setPostByKey(key: string, data: Data) {
  try {
    const reff = ref(db, "post/" + key);
    if (data.title && data.text) {
      update(reff, {
        title: data.title,
        text: data.text,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

// atualiza o dado indicado pela key
async function setPostByKeyTextPrincipal(data: Data) {
  try {
    const reff = ref(db, "textoPrincipal/");
    if (data.title && data.text) {
      update(reff, {
        title: data.title,
        text: data.text,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

// remove o dado indicado pela key
async function delPostByKey(key: string) {
  try {
    const reff = ref(db, "post/" + key);

    remove(reff);
    return true;
  } catch (error) {
    return false;
  }
}

export {
  createPost,
  getPost,
  getPostByKey,
  setPostByKey,
  delPostByKey,
  setPostByKeyTextPrincipal,
};
