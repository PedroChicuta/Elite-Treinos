import LogoImage from "../assets/logo.png";

export function Logo() {
  return (
    <div className="text-gray-800 flex items-center gap-2 p-4">
      <img src={LogoImage} alt="Logo" className="w-10 h-10" />
      <h1 className="text-2xl font-bold">Elite Treinos</h1>
    </div>
  );
}
