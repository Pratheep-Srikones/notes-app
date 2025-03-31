import AuthForm from "@/components/AuthForm";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="mb-6">
          <CardTitle className="text-center text-3xl font-bold">
            Login
          </CardTitle>
        </CardHeader>

        <AuthForm type="login" />
      </Card>
    </div>
  );
}

export default LoginPage;
