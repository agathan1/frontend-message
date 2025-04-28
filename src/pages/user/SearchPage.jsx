import { useEffect, useRef, useState } from "react";
import Warning from "../../components/molecule/Warning.jsx";
import { Button } from "flowbite-react";
import { getMessage } from "../../query/useMessage/getMessage.js";
import CardMessage from "../../components/molecule/CardMessage.jsx";
import { Link } from "react-router";
import Skeleton from "../../components/molecule/Skeleton.jsx";

export default function SearchPage() {
  const [searchLoading, setSearchLoading] = useState(false);
  const [isResultSearch, setIsResultSearch] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const currentNameInSearch = useRef(""); // untuk memperbarui/menangkap nama yang sedang di cari

  const { allMessage, isLoading, error } = getMessage({
    queryKey: ["getAllMessageUser"],
  });

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // my logic for search data
  // };

  const handleSearch = async () => {
    setSearchLoading(true);
    setIsSearch(true);
    // console.log("surah awal", surah);

    const filteredMessage = allMessage?.data.filter((data) => {
      const regexForData = /[.,-?!'\s]/g;
      return data.send_to
        ?.toLowerCase()
        .replace(regexForData, "")
        .includes(search.toLowerCase().replace(regexForData, ""));
    });
    currentNameInSearch.current = search;
    // console.log("filteredMessage", filteredMessage);
    setIsResultSearch(filteredMessage);
    setSearchLoading(false);
  };

  // // Fungsi untuk mendeteksi tombol Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Mencegah form submit default
      handleSearch();
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search.trim() === "") {
      setIsSearch(false);
      currentNameInSearch.current = "";
    }
  }, [search]);

  // useEffect(() => {
  //   if (isSearch) {
  //     let currentName =
  //   }
  // }, [isSearch]);

  // useEffect(() => {
  //   if (searchTerm.trim() === "") {
  //     setFilteredData(dataReal);
  //     setItemsToShow(5); // Reset jumlah item ke default
  //   }
  // }, [searchTerm, dataReal]);

  // console.log("isResultSearch", isResultSearch);

  return (
    <>
      <div className="px-4 max-[750px]:max-w-full max-w-[70%] mx-auto">
        <div>
          <Warning
            description={"Change a few things up and try submitting again."}
          />
        </div>
        <section className="mt-8 flex w-full flex-row gap-4 size-full">
          <input
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={search}
            type="text"
            className="grow size-full border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:placeholder-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Cari nama penerima..."
          />
          <div>
            <Button onClick={handleSearch} className="!bg-secondary">
              Search
            </Button>
          </div>
        </section>

        {/* CONDITIONAL RENDERING JIKA HASIL PENCARIAN ADA DAN TAMPILAN AWALNYA */}
        {/* JIKA ISEARCH = TRUE MAKA AKAN MENAMPILKAN DATA DARI "ISRESULTSEARCH". NAMUN, JIKA ISSEARCH = FALSE MAKA AKAN MENAMPILKAN DATA DARI "SURAH" */}
        <section className="mt-8 grid grid-cols-2  max-[600px]:grid-cols-1 max-[600px]:px-4 gap-4 px-4 mx-auto">
          {(isSearch ? isResultSearch : allMessage?.data)?.map((item) => (
            <>
              <div className="mb-4">
                <Link to={`/message/${item._id}`}>
                  <CardMessage
                    send_to={item.send_to}
                    message={item.message}
                    createDate={item.createdAt}
                  />
                </Link>
              </div>
            </>
          ))}
        </section>

        {isSearch && isResultSearch.length === 0 && (
          <p className="text-center">
            Tidak ada pesan untuk <span className="font-bold font-poppins text-secondary">"{currentNameInSearch.current}" </span>
          </p>
        )}
        {isLoading &&
          [...Array(10)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-24 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"
            />
          ))}

        {searchLoading &&
          [...Array(10)].map((_, index) => (
            <Skeleton
              key={index}
              className="h-24 bg-gray-200 rounded-lg dark:bg-gray-700 w-full mb-4"
            />
          ))}

        {allMessage?.data.length === 0 ||
          (error && <p className="text-center">Tidak ada pesan saat ini</p>)}
      </div>
    </>
  );
}

{
  /* <section className="mt-8 grid grid-cols-2  max-[600px]:grid-cols-1 gap-4 px-4 mx-auto">
{allMessage?.data.map((item, index) => (
  <div key={index}>
    <Link to={`/message/${item._id}`}>
      <CardMessage
        send_to={item.send_to}
        message={item.message}
        createDate={item.createdAt}
      />
    </Link>
  </div>
))}
</section> */
}
