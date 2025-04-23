import React from "react";
import { Link, useNavigate } from "react-router";
import CardMessage from "../../components/molecule/CardMessage";
import FeatureCard from "../../components/molecule/FeatureCard";
import Marquee from "react-fast-marquee";
import { getMessage } from "../../query/useMessage/getMessage";

// line-clamp-2


const featureMenu = [
  {
    id: 1,
    title: "Kirim Pesan Kepada Seseorang.",
    description:
      "Kirim pesan yang baik ke pada orang yang kamu cintai dan kamu anggap spesial",
  },
  {
    id: 2,
    title: "Mencari Semua atau beberapa Pesan.",
    description:
      "Temukanlah pesan yang dituju untuk anda. Car nama anda di antara banyaknya pesan",
  },
  {
    id: 3,
    title: "Melihat pesan yang kamu kirimkan.",
    description: "Kamu dapat melihat semua pesan yang kamu kirimkan.",
  },
];

// <div class="max-[600px]:bg-sky-300 min-[320px]:text-center"> contoh penggunaan media query inline

export default function HomePages() {
  const { allMessage, error, isLoading } = getMessage({
    queryKey: ["getMessageHomePage", 1, 6],
  });
  const navigate = useNavigate();

  const handleToSend = () => {
    navigate("/Send");
  };

  const handleSearch = () => {
    navigate("/Search");
  };

  return (
    <>
      <div className="sm:max-w-[70%] mx-auto px-4 space-y-8">
        {/* <Warning /> */}
        <div className="text-center text-secondary">
          <blockquote className="text-3xl/12 font-poppins font-extrabold mx-auto sm:text-4xl/16 md:text-5xl/18">
            Nyatakan apapun yang ingin kamu ungkapkan tanpa takut diketahui
          </blockquote>
          <p className="mt-8 text-lg md:text-2xl sm:text-xl font-medium font-poppins text-slate-600">
            Ungkapkan semua yang kamu pikirkan
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={handleToSend}
            type="button"
            class="flex-1 col-start-1 text-white my-auto md:w-[28%] font-poppins text-lg bg-black hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2 focus:outline-none "
          >
            Ungkapkan sekarang
          </button>
          <button
            onClick={handleSearch}
            type="button"
            class="flex-1 text-secondary my-auto md:w-[28%]  font-poppins text-lg border border-secondary hover:bg-slate-300 focus:ring-1 focus:ring-seondary font-medium rounded-lg px-5 py-2.5 me-2 mb-2 focus:outline "
          >
            Cari pesan
          </button>
        </div>
      </div>

      <section className="grid grid-cols-3 max-[720px]:grid-cols-1 px-4 mt-22 gap-4 place-items-center">
        {featureMenu.map((menu) => (
          <FeatureCard
            key={menu.id}
            title={menu.title}
            description={menu.description}
          />
        ))}
        {/* {[...Array(3)].map((_, index) => (
          <FeatureCard title={} />
        ))} */}
      </section>

      <div className="my-18">
        {/* Marquee ke kiri */}
        <Marquee
          speed={40}
          gradient={true}
          gradientWidth={100}
          gradientColor="#fff"
          className="mt-10"
          pauseOnClick
        >
          <div className="flex gap-4 px-4">
            {allMessage?.data.map((data, index) => (
              // <Link to={`/message/${data._id}`} key={index}>
                <CardMessage
                  key={`left-${index}`}
                  send_to={data.send_to}
                  message={data.message}
                  createDate={data.createdAt}
                />
              // {/* </Link> */}
            ))}
          </div>
        </Marquee>

        {/* Marquee ke kanan */}
        <Marquee speed={40} gradient={false} direction="right" className="mt-4" pauseOnClick>
          <div className="flex gap-4 px-4">
            {(allMessage?.data)?.map((data, index) => (
              // <Link to={`/message/${data._id}`} key={index}>
                <CardMessage
                  key={`right-${index}`}
                  send_to={data.send_to}
                  message={data.message}
                  createDate={data.createdAt}
                />
              // </Link>
            ))}
          </div>
        </Marquee>
      </div>
    </>
  );
}
