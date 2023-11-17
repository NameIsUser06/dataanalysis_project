"use client";
import Header from "@/components/header";
import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Home: React.FC = () => {
  const [imageData, setImageData] = useState<string | null>(null);
  const [attribute1, setAttribute1] = useState<string>("");
  const [attribute2, setAttribute2] = useState<string>("");

  const handleDivClick = () => {
    const fileInput = document.getElementById("csvInput");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("csv", file);
      formData.append("attribute1", attribute1);
      formData.append("attribute2", attribute2);

      try {
        const response = await axios.post<ServerResponse>(
          "http://127.0.0.1:5000/api/plot",
          formData
        );

        // 이미지 데이터를 state에 설정
        setImageData(response.data.image);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Container>
      <Header />

      {/* 추가: 속성 1 입력란 */}
      <Input
        type="text"
        placeholder="Enter Attribute 1"
        value={attribute1}
        onChange={(e) => setAttribute1(e.target.value)}
      />

      {/* 추가: 속성 2 입력란 */}
      <Input
        type="text"
        placeholder="Enter Attribute 2"
        value={attribute2}
        onChange={(e) => setAttribute2(e.target.value)}
      />

      {imageData && (
        <StyledImage
          src={`data:image/png;base64,${imageData}`}
          alt="Processed Image"
        />
      )}
      <FileInput
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        id="csvInput"
      />
      <StyledDiv onClick={handleDivClick}>Select CSV File</StyledDiv>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  left: 0;
  top: 0;
`;

const FileInput = styled.input`
  display: none;
`;

const StyledDiv = styled.div`
  background-color: #3356ff;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  width: 10rem;
  height: 4rem;
  text-align: center;
  align-items: center;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  margin: 5rem auto;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin: 1.5rem auto;
  height: 1.5rem;
`;

interface ServerResponse {
  image: string;
}

export default Home;
