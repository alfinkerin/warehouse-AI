import React, { useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

type PropsTable = {
  data: [];
  isLoading: boolean;
  deleteData?: () => void;
  editData?: () => void;
};

export default function Table({
  data,
  isLoading,
  deleteData,
  editData,
}: PropsTable) {
  const [userData, setUserData] = useState<any>(data);

  const handleChange = (e: any) => {
    const { name, checked } = e.target;
    if (name === "allSelected") {
      const checkValue = data.map((user: any) => {
        return { ...user, isChecked: checked };
      });
      console.log(checkValue);
      setUserData(checkValue);
    }
  };

  console.log(userData);

  return (
    <>
      {isLoading === true ? (
        <div className="w-full flex justify-center items-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}
            <thead>
              <tr className="font-bold text-base">
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="allSelected"
                      checked={
                        !data.some((user: any) => user?.isChecked !== true)
                      }
                      onChange={handleChange}
                    />
                  </label>
                </th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data?.map((x: any, i: any) => (
                <tr key={i}>
                  <th>
                    <label>
                      <input
                        type="checkbox"
                        className="checkbox"
                        name={x.name}
                        checked={userData?.isChecked}
                        onChange={handleChange}
                      />
                    </label>
                  </th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{x?.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{x?.stock}</td>
                  <td>{x?.price}</td>

                  <th className="flex gap-4">
                    <div
                      onClick={deleteData}
                      className="tooltip tooltip-primary"
                      data-tip="Delete"
                    >
                      <AiFillDelete
                        className="cursor-pointer text-red-400 hover:text-red-600 "
                        size="20"
                      />
                    </div>

                    <div
                      onClick={editData}
                      className="tooltip tooltip-primary"
                      data-tip="Edit"
                    >
                      <AiFillEdit
                        className="cursor-pointer text-green-400 hover:text-green-600 "
                        size="20"
                      />
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
