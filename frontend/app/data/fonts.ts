import { Lalezar, Open_Sans } from "next/font/google";
const l = Lalezar({ weight: "400", subsets: ["latin"] });
const o = Open_Sans({ subsets: ["latin"] });

export const lalezar = l.className as string;
export const openSans = o.className as string;
