import Home from "../content/Home";
import TR_English from "../content/TR_English";
import TR_Hanzi from "../content/TR_Hanzi";
import TR_Italiano from "../content/TR_Italiano";
import TR_PinYin from "../content/TR_PinYin";

export const paths = [
  {
    labela: "Home",
    path: "/",
    component: Home,
    label: {
      en: "Home",
      it: "Casa",
      zh: "主页"
    }
  },
  {
    label: "Italiano",
    path: "/italiano",
    component: TR_Italiano,
    icon: "/images/italy.png"
  },
  {
    label: "Hanzi",
    path: "/hanzi",
    component: TR_Hanzi,
    icon: "/images/kanji.png"
  },
  {
    label: "PinYin",
    path: "/pinyin",
    component: TR_PinYin,
    icon: "/images/love.png"
  },
  {
    label: "English",
    path: "/english",
    component: TR_English,
    icon: "/images/english.png"
  }
];
