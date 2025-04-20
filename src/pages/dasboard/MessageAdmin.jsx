import React, { useEffect, useState } from "react";
import TableAdmin from "../../components/layouts/TableAdmin";
import { getMessage } from "../../query/useMessage/getMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteMassageAdmin from "../../query/queryBackEnd/messageAdmin/DeleteMassageAdmin";
import Swal from "sweetalert2";
import ModalEdit from "../../components/admin/ModalEdit";
import ModalForm from "../../components/layouts/ModalForm";
import { postMessage } from "../../query/useMessage/postMessage";

export default function MessageAdmin() {
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    send_to: "",
    message: "",
  });
  

  const handleChangeCreateMessage = (newFormData) => {
    setFormData(newFormData);
  };

  const { allMessage, isLoading, error, refetch } = getMessage(
    { queryKey: ["getAllMessageAdmin", page, 5] } // page & limit masuk ke queryKey
  );

  const columns = [
    { label: "Send To", accessor: "send_to" },
    { label: "Message", accessor: "message" },
    { label: "Created At", accessor: "createdAt" },
  ];

  // untuk bagian modal message
  const fields = [
    {
      name: "send_to",
      label: "Send To",
      type: "text",
      placeholder: "Isi penerima",
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Isi pesan",
    },
  ];
  // delete message

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteMassageAdmin,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        text: "Pesan berhasil dihapus",
      });
      queryClient.invalidateQueries(["getAllMessageAdmin"]);
    },

    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Opss.. Sorry",
        text:
          error?.message || "Terjadi kesalahan di server. Tunggu sebentar yak.",
      });
      setIsLoading(false);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  const handleEdit = (id) => {
    setSelectedId(id);
    setModalEdit(true);
  };

  // delete message

  // ========== create message

  const createMessage = useMutation({
    mutationFn: () => postMessage({ ...formData }),
    onSuccess: () => {
      refetch(); // refresh data
      setModalCreate(false); // tutup modal
      Swal.fire("Berhasil!", "Pesan berhasil dibuat", "success");
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

  const handleCreateMessage = (e) => {
    e.preventDefault();
    createMessage.mutate({
      ...formData,
    });
  };

  // =========== create message

  // console.log(allMessage?.data);
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="flex items-center justify-between">
          <p className="font-poppins text-4xl">Message</p>
          <button
            onClick={() => setModalCreate(true)}
            className="bg-green-500 p-2 rounded-lg text-white"
          >
            Create message
          </button>
        </div>
        <div className="mt-8">
          <TableAdmin
            page={page}
            hasNextPage={allMessage?.hasNextPage}
            onPrev={() => setPage((prev) => Math.max(prev - 1, 1))}
            onNext={() => setPage((prev) => prev + 1)}
            rows={allMessage?.data || []}
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
                  {/* <button onClick={() => handleEdit(row._id)} className="bg-blue-500 p-2 rounded-lg text-white"> */}
                  Edit
                </button>
              </>
            )}
          />
        </div>
        <div>
          {modalEdit && (
            <ModalEdit
              id={selectedId}
              // onSubmit={handleEdit}
              onClose={() => setModalEdit(false)}
              onSuccess={() => {
                setModalEdit(false);
                refetch();
                queryClient.invalidateQueries(["getAllMessageAdmin"]);
              }}
            />
          )}
        </div>
        {modalCreate && (
          // dipakai di dalam komponen
          <ModalForm
            title="Create Message"
            fields={fields}
            formData={formData}
            onChange={handleChangeCreateMessage}
            onSubmit={handleCreateMessage}
            onClose={() => setModalCreate(false)}
            isPending={createMessage.isPending}
          />
        )}
      </div>
    </>
  );
}
