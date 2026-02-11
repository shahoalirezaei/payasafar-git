import localFont from "next/font/local";

export const peyda = localFont({
  src: [
    {
      path: "../../public/fonts/peyda/PeydaFaNumWeb-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/peyda/PeydaFaNumWeb-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/peyda/PeydaFaNumWeb-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/peyda/PeydaFaNumWeb-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-peyda",
  display: "swap",
});
