"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/services/actions/logout";

const Navbar = ({ user }) => {
  const router = useRouter();
  const logout = async () => {
    try {
      logoutAction()
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="h-20 flex">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1>Docs Clone</h1>
        </Link>
        <div className="flex items-center space-x-4">
          {user?.username ? (
            <>
              <h1>{user?.username}</h1>
              <Button onClick={logout} variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
