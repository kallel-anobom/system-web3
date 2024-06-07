"use client";

import { useState, useEffect } from "react";
import { doLogin } from "../service/Web3Service";
import Image from "next/image";

export default function Header() {
  const [wallet, setWallet] = useState("");

  useEffect(() => {
    setWallet(localStorage.getItem("wallet") || "");
  }, []);

  async function btnLoginClick() {
    try {
      const result = await doLogin();
      console.log(result)
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          <a
            href="/"
            className="justify-content-start"
            style={{ textDecoration: "none" }}
          >
            <h1 className="fw-bold text-light">FloodHelp</h1>
          </a>
          <div className="text-end col-9">
            {wallet ? (
              <a href="/create" className="btn btn-warning">
                Pedir Ajuda
              </a>
            ) : (
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={btnLoginClick}
              >
                <Image
                  src="/metamask.svg"
                  alt="Metamask Logo"
                  width={24}
                  height={24}
                  className="me-3"
                />
                Entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
