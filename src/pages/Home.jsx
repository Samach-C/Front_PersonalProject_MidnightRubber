import React, { useState } from "react";
import MainNav from "../components/MainNav";
import MainMap from "../components/MainMap";

export default function Home() {
  const [SearchTerm, setSearchTerm] = useState("");
  return (
    <div>
      <MainNav setSearchTerm={setSearchTerm} />
      <MainMap SearchTerm={SearchTerm} />
    </div>
  );
}
