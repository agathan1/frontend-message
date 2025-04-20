import React from "react";
import Warning from "../../components/molecule/Warning";
import CardMessage from "../../components/molecule/CardMessage";
import { Link, useNavigate } from "react-router";
import { getMyMessage } from "../../query/useMessage/getMyMessage";

export default function HistoryMessage() {
  const navigate = useNavigate();
  const { myMessage, isPending, error, isError } = getMyMessage();

  console.log("message gue", myMessage?.data.length);
  return (
    <>
      <div className="px-4 max-[750px]:max-w-full max-w-[70%] mx-auto">
        <div>
          <Warning
            description={"Untuk saat ini, kamu belum bisa menghapus pesan."}
            // info={"Warning!"}
            color={"bg-amber-500"}
          />
        </div>

        <section className="mt-8 grid grid-cols-2  max-[600px]:grid-cols-1 gap-4 px-4 mx-auto">
          {myMessage?.data.map((item, index) => (
            <Link to={`/message/${item._id}`}>
              <div key={index}>
                <CardMessage
                  send_to={item.send_to}
                  message={item.message}
                  createDate={item.createdAt}
                />
              </div>
            </Link>
          ))}

          {/* {allMessage?.data.map((item, index) => (
            <div key={index}>
              <Link to={`/message/${item._id}`}>
                <CardMessage
                  send_to={item.send_to}
                  message={item.message}
                  createDate={item.createdAt}
                />
              </Link>
            </div>
          ))} */}
        </section>
        {myMessage?.data.length === 0 ? (
          <p className="text-center text-black font-poppins font-semibold text-lg">
            Belum ada pesan yang kamu kirim! Coba untuk kirim pesan{" "}
            <span className="text-secondary underline">
              <Link to="/Send">disini</Link>
            </span>
          </p>
        ) : (
          myMessage?.data === undefined && (
            <p className="text-center text-black font-poppins font-semibold text-lg">
              Belum ada pesan yang kamu kirim! Coba untuk kirim pesan{" "}
              <span className="text-secondary underline">
                <Link to="/Send">disini</Link>
              </span>
            </p>
          )
        )}
        {/* {myMessage?.data.length === 0 || myMessage?.data === undefined && (
          <p className="text-center text-black font-poppins font-semibold text-lg">
            Belum ada pesan yang kamu kirim! Coba untuk kirim pesan{" "}
            <span className="text-secondary underline">
              <Link to="/Send">disini</Link>
            </span>
          </p>
        )} */}
      </div>
    </>
  );
}
