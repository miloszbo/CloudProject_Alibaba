import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/home");
  };
  const handleLogin = () => {
    navigate("/");
  }
  return (


    <header className="w-full items-center">
      <div className="p-5 flex items-center w-full">
        <div className="w-1/2 flex items-center gap-3">
          <img src="/logo planer.png" alt="Logo" className="h-15 w-auto" />
          <p className="p text-[36px] text-left text-white"><b>Inteligentny Planner Wydatków</b></p>
        </div>

        <div className="w-1/2 flex justify-end items-center gap-1 ">

        {/* 
        <button className="btn btn-ghost text-[24px] px-1.5 py-1.5" onClick={(handleHome)}>
          MainPage
        </button>
        */}
        <button className="btn btn-ghost text-[24px] px-1.5 py-1.5" onClick={() => window.open("https://github.com/Aia-shi/CloudProject_OCI")}>
          Github
        </button>
        <button className="btn btn-ghost text-[24px] px-1.5 py-1.5" onClick={(handleLogin)}>
          Wyloguj
        </button>
          
        </div>
      </div>
    </header>
  );
}