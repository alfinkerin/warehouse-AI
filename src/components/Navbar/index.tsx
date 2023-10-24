import { useStore } from "@/store/page";
import { useSession } from "next-auth/react";

function Navbar() {
  const title = useStore((state) => state.title);
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-between items-center mb-2">
      <div className="font-bold text-lg">{title}</div>
      <div className="text-lg font-semibold">{session?.user?.username}</div>
    </div>
  );
}

export default Navbar;
