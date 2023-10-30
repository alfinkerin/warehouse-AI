import { useStore } from "@/store/page";
import { signOut } from "next-auth/react";
import { AiOutlinePoweroff } from "react-icons/ai";
function Navbar() {
  const title = useStore((state) => state.title);

  return (
    <div className="flex justify-between text-white bg-gradient-to-l from-[#A951A3] to-[#f582e9] py-2 px-4 rounded-md shadow-md items-center mb-2">
      <div className="font-bold text-lg">{title}</div>
      <div
        className="tooltip tooltip-bottom tooltip-secondary"
        data-tip="Logout"
      >
        <AiOutlinePoweroff
          onClick={() => signOut()}
          size="25"
          color="white"
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Navbar;
