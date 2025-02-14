'use client'
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const StyledButton = styled.button`
    padding: 5px 10px;
    border-radius: 5px;
    border: none;
    background-color: #FF4B2B;
    color: #ffffff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        transform: translateY(-2px);
    }

    &:active {
        transform: scale(0.95);
    }
`;

export default function SelectLanguage(): React.ReactElement {

    const router = useRouter();

    const HandleClick = (e: any): void => {
        Cookies.set("locale", e.target.value);
        router.refresh();
    };

    return (
        <ButtonContainer>
            <StyledButton value={"en"} onClick={HandleClick}>En</StyledButton>
            <StyledButton value={"es"} onClick={HandleClick}>Es</StyledButton>
        </ButtonContainer>
    );
}
