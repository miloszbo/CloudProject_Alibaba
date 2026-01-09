import React from "react";

export function Profil() {
  return (
    <div className="p-6 h-full text-black">
      <div className="bg-[#e0e0e0] rounded-2xl px-6 py-4 mt-4 h-[360px]">
        <div className="flex items-start gap-6">
          <div className="w-[80px] h-[100px] bg-[#d6d6d6] rounded-xl" />

          <div className="flex flex-col gap-1 text-sm">
            <p className="font-medium">Nazwa użytkownika</p>
            <p>e-mail</p>
            <p>Stan konta</p>
          </div>
        </div>
      </div>
    </div>
  );
}
