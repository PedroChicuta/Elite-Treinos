import loginImage from "../../assets/login-image.jpg";
import { LoginForm } from "../../components/auth/LoginForm";
import { Logo } from "../../components/Logo";

export function Login() {
  return (
    <div className="flex-1 flex">
      <section className="w-1/2 flex">
        <img
          src={loginImage}
          alt="Login"
          className="w-full flex-1 object-cover grayscale"
        />
      </section>

      <section className="flex flex-col justify-center items-center p-4 w-1/2">
        <Logo />
        <LoginForm />
      </section>
    </div>
  );
}
