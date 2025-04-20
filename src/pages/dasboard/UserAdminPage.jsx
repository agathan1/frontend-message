import React, { useState } from "react";
import TableAdmin from "../../components/layouts/TableAdmin";
import { getUsers } from "../../query/queryBackEnd/userAdmin/getUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { deleteUser } from "../../query/queryBackEnd/userAdmin/deleteUser";
import ModalEditUser from "../../components/admin/ModalEditUser";
import ModalForm from "../../components/layouts/ModalForm";
import { createUser } from "../../query/queryBackEnd/userAdmin/createUser";

export default function UserAdminPage() {
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      role: "",
    });
  const { allUsers, isLoading, error, refetch } = getUsers({
    queryKey: ["getAllUsers"],
  });

  const columns = [
    { label: "User Name", accessor: "username" },
    { label: "Email", accessor: "email" },
    { label: "Role", accessor: "role" },
    { label: "Created At", accessor: "createdAt" },
  ];

  // field create user untuk bagian modal
  const fields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Isi username",
    },
    { name: "email", label: "Email", type: "email", placeholder: "Isi email" },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Isi password",
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
    },
  ];

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        text: "User berhasil dihapus",
      });
      queryClient.invalidateQueries(["getAllUsers"]);
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Anda yakin ingin menghapus user ini?",
      text: "Anda tidak dapat mengembalikan data yang telah dihapus",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setModalEdit(true);
  };


  // -------- function create user -------

  const handleChangeUser = (newFormData) => {
    setFormData(newFormData);
  };
  
  const createUserMutation = useMutation({
    mutationFn: () => createUser({ ...formData }),
    onSuccess: () => {
      setFormData({ username: "", email: "", password: "", role: "" });
      setModalCreate(false);
      Swal.fire({
        icon: "success",
        text: "User berhasil ditambahkan",
      });
      queryClient.invalidateQueries(["getAllUsers"]);
      // refetch();
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

  const handleCreateUser = (e) => {
      e.preventDefault();
      createUserMutation.mutate({
        ...formData
      });
    }



    // -------- function create user -------
    // console.log("form data", formData);
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="flex items-center justify-between">
          <p className="font-poppins text-4xl">User</p>
          <button
            onClick={() => setModalCreate(true)}
            className="bg-green-500 p-2 rounded-lg text-white"
          >
            Create User
          </button>
        </div>
        <div className="mt-8">
          <TableAdmin
            page={page}
            hasNextPage={allUsers?.hasNextPage}
            onPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
            onNext={() => setPage((prev) => prev + 1)}
            rows={allUsers?.data || []}
            columns={columns}
            renderActions={(row) => (
              <>
                <button
                  onClick={() => handleDelete(row._id)}
                  className="bg-red-500 p-2 rounded-lg text-white"
                >
                  Delete
                </button>
                <button
                  // onClick={() => setModalEdit(false)}
                  onClick={() => handleEdit(row._id)}
                  className="bg-blue-500 p-2 rounded-lg text-white"
                >
                  Edit
                </button>
              </>
            )}
          />
        </div>
        <div>
          {modalEdit && (
            <ModalEditUser
              id={selectedId}
              onSubmit={handleEdit}
              onClose={() => setModalEdit(false)}
              onSuccess={() => {
                setModalEdit(false);
                refetch();
                queryClient.invalidateQueries(["getAllMessageAdmin"]);
              }}
            />
          )}
        </div>
        <div>
          {modalCreate && (
            <ModalForm
              title={"Create User"}
              formData={formData}
              fields={fields}
              onChange={handleChangeUser}
              isPending={createUserMutation.isLoading}
              onSubmit={handleCreateUser}
              onClose={() => setModalCreate(false)}
              // onSuccess={() => {
              //   setModalCreate(false);
              //   refetch();
              //   queryClient.invalidateQueries(["getAllMessageAdmin"]);
              // }}
            />
          )}
        </div>
      </div>
    </>
  );
}
