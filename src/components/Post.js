import React from "react";
import { formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";
import { notSil } from "../actions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Post({ item }) {
  const silindiBildiri = () =>
    toast("Artık bu duruma minnet duymadığın için üzüldüm :(", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const dispatch = useDispatch();
  function handleSil(a) {
    // burada ilgili eylemi dispatch edin
    // sonra toast mesajı gösterin
    dispatch(notSil(a));
    silindiBildiri();
  }

  return (
    <div className="beyazKutu p-8 pb-6 mb-4 text-sm">
      <h1>
        {formatDistanceToNow(new Date(item.date), {
          addSuffix: true,
          locale: tr,
        })}
      </h1>

      {item.body.split("|").map((li) => (
        <p className="mt-2" key={li}>
          - {li}
        </p>
      ))}

      <button
        className="text-xs text-amber-600 mt-4 underline"
        onClick={() => handleSil(item.id)}
      >
        Bu notu sil
      </button>
    </div>
  );
}
