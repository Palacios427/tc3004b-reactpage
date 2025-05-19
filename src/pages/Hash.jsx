import React, { useState } from "react";

const HashViewer = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [text1, setText1] = useState("");
  const [hash1, setHash1] = useState("");
  const [text2, setText2] = useState("");
  const [hash2, setHash2] = useState("");

  const handleHash = async (text, setHash) => {
    try {
      const res = await fetch(API_URL + "/api/hash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (data.hash) {
        setHash(data.hash);
      } else {
        setHash("Error: No hash returned");
      }
    } catch (err) {
      console.error("Error al obtener el hash:", err);
      setHash("Error al conectarse con el servidor");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Hash Viewer (SHA-256)</h2>

      <div style={{ marginBottom: "2rem" }}>
        <label>Texto 1:</label>
        <input
          type="text"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
        />
        <button
          onClick={() => handleHash(text1, setHash1)}
          style={{ marginTop: "0.5rem" }}
        >
          Generar Hash
        </button>
        <p>
          <strong>Hash:</strong> {hash1}
        </p>
      </div>

      <div>
        <label>Texto 2:</label>
        <input
          type="text"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
        />
        <button
          onClick={() => handleHash(text2, setHash2)}
          style={{ marginTop: "0.5rem" }}
        >
          Generar Hash
        </button>
        <p>
          <strong>Hash:</strong> {hash2}
        </p>
      </div>
    </div>
  );
};

export default HashViewer;
