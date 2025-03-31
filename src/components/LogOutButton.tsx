import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/user";

const LogOutButton = () => {
  const [loading, setLoading] = useState(false); // Replace with actual logout logic
  const router = useRouter(); // Use Next.js router for navigation
  const handleLogout = async () => {
    setLoading(true);

    const { errorMessage } = await logOutAction();

    if (!errorMessage) {
      router.replace(`/login`);
    } else {
    }

    setLoading(false);
  };

  return (
    <Button
      className="w-24"
      variant="outline"
      disabled={loading}
      onClick={handleLogout}
    >
      {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Logout"}
    </Button>
  );
};

export default LogOutButton;
