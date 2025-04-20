import { Fieldset, Input, Label, Legend } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getMessageById } from "../../query/useMessage/getMessageById";
import { updateMessage } from "../../query/useMessage/updateMessage";
import Swal from "sweetalert2";

export default function ModalEdit({ id, onClose, onSuccess }) {
  const [formData, setFormData] = useState({ send_to: "", message: "" });

  const { detailData, isPending } = getMessageById({ id });

  useEffect(() => {
    if (detailData) {
      setFormData({
        send_to: detailData?.data.send_to || "",
        message: detailData?.data.message || "",
      });
    }
  }, [detailData]);

  // Mutation for updating
  const mutation = useMutation({
    mutationFn: (newData) => updateMessage({ id, ...newData }), // jika tidak menggunakan spread operator maka akan error
    onSuccess: () => {
      Swal.fire("Berhasil!", "Pesan berhasil diperbarui", "success");
      onSuccess(); // refresh data & tutup modal
    },
    onError: () => {
      Swal.fire("Gagal!", "Terjadi kesalahan saat update", "error");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      send_to: formData.send_to,
      message: formData.message,
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>

          <form onSubmit={handleSubmit}>
            <Fieldset className="space-y-6">
              <Legend className="text-2xl font-semibold text-center font-poppins">
                Edit Message
              </Legend>

              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Send To
                </Label>
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, send_to: e.target.value })
                  }
                  value={formData.send_to}
                  type="text"
                  placeholder="silahkan isi disini"
                  className="w-full mt-1 rounded-lg border px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  value={formData.message}
                  type="text"
                  placeholder="silahkan isi message disini"
                  className="w-full mt-1 rounded-lg border px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className={`w-full text-white font-poppins text-lg rounded-lg px-5 py-2.5 transition ${
                  isPending
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isPending ? "Loading..." : "Submit"}
              </button>
            </Fieldset>
          </form>
        </div>
      </div>
    </>
  );
}
