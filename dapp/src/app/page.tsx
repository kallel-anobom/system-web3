"use client";

import { useEffect, useState } from "react";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Request from "@/components/Request";

import { getOpenRequests } from "../service/Web3Service";

export default function Home() {
  const [requests, setRequests] = useState<any>([]);

  useEffect(() => {
    loadRequests(0);
  }, []);

  async function loadRequests(lastId: number) {
    try {
      const result: any = await getOpenRequests(lastId);
      if (lastId === 0) setRequests(result);
      else {
        requests.push(...result);
        setRequests(requests);
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="row ps-5">
          <p className="lead m-4">
            Ajude as vítimas de enchentes e demais desastres naturais do Brasil.
          </p>
        </div>
        <div className="p-4 mx-5">
          <div className="list-group">
            {requests && requests.length ? (
              requests.map((rq: any) => <Request key={rq.id} data={rq} />)
            ) : (
              <>
                Conect sua carteira MetaMask no botão <span>Entrar</span> para ajudar ou
                pedir ajuda.
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
