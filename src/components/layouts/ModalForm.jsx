export default function ModalForm({
    title,
    fields = [],
    formData,
    onChange,
    onSubmit,
    onClose,
    isPending = false,
  }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>
  
          <form onSubmit={onSubmit}>
            <fieldset className="space-y-6">
              <legend className="text-2xl font-semibold text-center font-poppins">
                {title}
              </legend>
  
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field.label}
                  </label>
  
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        onChange({ ...formData, [field.name]: e.target.value })
                      }
                      className="w-full mt-1 rounded-lg border px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        onChange({ ...formData, [field.name]: e.target.value })
                      }
                      placeholder={field.placeholder}
                      className="resize-none w-full mt-1 rounded-lg border px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  ) : field.type === "email" ?(
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        onChange({ ...formData, [field.name]: e.target.value })
                      }
                      placeholder={field.placeholder}
                      className="w-full mt-1 rounded-lg border px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        onChange({ ...formData, [field.name]: e.target.value })
                      }
                      placeholder={field.placeholder}
                      className="w-full mt-1 rounded-lg border px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  )}
                </div>
              ))}
  
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
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
  