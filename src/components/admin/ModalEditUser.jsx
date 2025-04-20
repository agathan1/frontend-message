import { Fieldset, Input, Label, Legend } from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import React, { use, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getUserById } from "../../query/queryBackEnd/userAdmin/getUserById";
import { updateUser } from "../../query/queryBackEnd/userAdmin/updateUser";

export default function ModalEditUser({ id, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    email: "",
  });

  const { detailUser, isPending } = getUserById({ id });
  // console.log("detailData", detailUser?.data);

  useEffect(() => {
    if (detailUser) {
      setFormData({
        username: detailUser?.data.username || "",
        password: detailUser?.data.password || "",
        role: detailUser?.data.role || "",
        email: detailUser?.data.email || "",
      });
    }
  }, [detailUser]);

  //   Mutation for updating
  const updateMutation = useMutation({
    mutationFn: (newData) => updateUser({ id, ...newData }), // jika tidak menggunakan spread operator maka akan error
    onSuccess: () => {
      Swal.fire("Berhasil!", "Pesan berhasil diperbarui", "success");
      onSuccess(); // refresh data & tutup modal
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Opss.. Sorry",
        text:
          error?.message || "Terjadi kesalahan di server. Tunggu sebentar yak.",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      username: formData.username,
      password: formData.password,
      role: formData.role,
      email: formData.email,
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
                Edit Users
              </Legend>

              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Username
                </Label>
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  value={formData.username}
                  type="text"
                  placeholder="silahkan isi disini"
                  className="w-full mt-1 rounded-lg border px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                  type="email"
                  placeholder="silahkan isi disini"
                  className="w-full mt-1 rounded-lg border px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div>
                <Label className="block text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                  type="password"
                  placeholder="silahkan isi disini"
                  className="w-full mt-1 rounded-lg border px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  role
                </label>
                <select
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  value={formData.role}
                  className="w-full mt-1 rounded-lg border px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
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
