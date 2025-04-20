import React, { useEffect, useState } from "react";
import Warning from "../../components/molecule/Warning";
import FormInput from "../../components/molecule/FormInput";
import { useNavigate } from "react-router";
import { postMessage } from "../../query/useMessage/postMessage";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import Modal from "../../components/molecule/Modal.jsx";

export default function SubmitPage() {
  const navigate = useNavigate();
  const [isValue, setIsValue] = useState({
    send_to: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const tokenUser = localStorage.getItem("tokenUser");
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  // modal otamomatis untuk login
  useEffect(() => {
    if (!tokenUser && role !== "user") {
      setIsOpen(true);
    }
  }, []);

  // submit data
  const handleChangeSend = (e) => {
    setIsValue((prev) => ({
      ...prev,
      send_to: e.target.value,
    }));
  };

  const handleChangeMessage = (e) => {
    setIsValue((prev) => ({
      ...prev,
      message: e.target.value,
    }));
  };

  const mutation = useMutation({
    mutationFn: () => postMessage({ ...isValue }),
    onSuccess: (data) => {
      setIsValue({ send_to: "", message: "" });
      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Yeayy",
        text: "Semoga lega ya isi pikran kamu",
      });
      // Arahkan ke halaman utama, contoh:
      navigate("/Search");
    },
    onError: (error) => {
      setIsValue({ send_to: "", message: "" });
      Swal.fire({
        icon: "error",
        title: "Opss.. Sorry",
        text:
          error?.message || "Terjadi kesalahan di server. Tunggu sebentar yak.",
      });
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    mutation.mutate({
      ...isValue,
    });
  };

  const handleToLogin = () => {
    navigate("/login");
    setIsOpen(false);
  };


  return (
    <>
      <div className="px-4 max-[750px]:max-w-full max-w-[70%] mx-auto">
        <Warning
          info={"Untuk saat ini, kamu belum bisa menghapus pesan"}
          description={
            "Untuk saat ini, kamu belum bisa menghapus pesan. Jadi, berbijaklah sebelum mengirim pesan."
          }
        />
        <section className="max-w-[70%] text-center mx-auto mt-8 font-poppins">
          We'd love to hear your feedback and suggestions to help us improve
          SendTheSong. Click here to share your thoughts with us!
        </section>

        {/* <div className="max-w-[70%] mx-auto"> */}
        <div className="mt-8">
          <FormInput
            isLoading={isLoading}
            sendTo={isValue.send_to}
            mainMessage={isValue.message}
            onChanngeSendTo={handleChangeSend}
            onChangeMessage={handleChangeMessage}
            onSubmit={handleSubmitMessage}
          />
        </div>
      </div>
      {/* modal untuk user harus login */}
      {isOpen && (
        <Modal
          isOpen={isOpen}
          close={() => setIsOpen(!false)}
          navigate={handleToLogin}
        />
      )}
    </>
  );
}
