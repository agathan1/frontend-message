import React from "react";
import { Link, useParams } from "react-router";
import { getMessageById } from "../../query/useMessage/getMessageById";
import CardMessage from "../../components/molecule/CardMessage";
import Skeleton from "../../components/molecule/Skeleton";

export default function DetailMessage() {
  const params = useParams();
  const { id } = params;

  const { detailData, isPending, isError, error } = getMessageById({
    id,
  });

  const date = new Date(detailData?.data?.createdAt);

  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div>
        {isPending ? (
          <>
           {[...Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-24 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"
            />
          ))}
          </>
        ) : (
          <>
            <div className="space-y-4">
              <section className="text-secondary justify-center flex gap-1 font-poppins font-medium text-3xl">
                <p>Hallooo,</p>
                <p>{detailData?.data?.send_to}</p>
              </section>
              <section className="text-black justify-center flex gap-1 font-poppins font-medium text-lg">
                <p className=" max-w-[50%] text-center max-[750px]:text-base max-[750px]:max-w-[80%]">
                  Ada seseorang nih yang mengirimkan pesan ke kamu. Mungkin si
                  pengirim mau berbagi sesuatu dengan kamu. Selamat membaca dan
                  semoga kamu senang.
                </p>
              </section>
            </div>
            <div className="mt-22 max-[750px]:mt-10">
              <section className="space-y-8 text-secondary justify-center flex flex-col font-poppins font-medium">
                <p className="text-center text-black">
                  Berikut isi pesan dari si pengirim:
                </p>
                <p className="max-w-[70%] mx-auto text-center font-satisfy text-5xl max-[750px]:text-3xl">
                  {detailData?.data?.message}
                </p>
                <p className="text-center font-poppins">
                  - Dikirim pada {formattedDate}
                </p>
              </section>
            </div>
            <div className="my-22">
              <section className="space-y-8 text-black justify-center flex flex-col font-poppins font-medium">
                <p className="text-center">
                  Terima kasih telah membaca pesan ini.
                </p>
                <p className="text-center">
                  Apakah kamu ingin mengirim pesan juga?
                </p>
                <Link to="/Send" className="text-center">
                  <button className=" text-secondary rounded-lg px-4 py-2 font-poppins font-medium text-lg underline underline-offset-8">
                    Ungkapkan sekarang
                  </button>
                </Link>
              </section>
            </div>
          </>
        )}
      </div>
    </>
  );
}
