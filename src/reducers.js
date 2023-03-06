import { NOT_EKLE, NOT_SIL } from "./actions";
const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [
    {
      id: "75g1IyB8JLehAr0Lr5v3p",
      date: "Fri Feb 03 2023 09:40:27 GMT+0300 (GMT+03:00)",
      body: "Bugün hava çok güzel!|En iyi arkadaşımın en iyi arkadaşı olduğumu öğrendim :)|Kedim iyileşti!",
    },
  ],
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar.length >= 1) {
    return localStorageStateOku(key);
  } else if (eskiNotlar.length === 0) {
    return baslangicDegerleri;
  }
}

const reducer = (
  state = baslangicNotlariniGetir(s10chLocalStorageKey),
  action
) => {
  switch (action.type) {
    case NOT_EKLE:
      const newState = { ...state, notlar: [action.payload, ...state.notlar] };
      localStorageStateYaz(s10chLocalStorageKey, newState);
      return newState;
    case NOT_SIL:
      const filteredNot = state.notlar.filter(
        (item) => item.id !== action.payload
      );
      const filteredState = {
        ...state,
        notlar: filteredNot,
      };
      localStorageStateYaz(s10chLocalStorageKey, filteredState);
      return filteredState;
    default:
      return state;
  }
};
export default reducer;
