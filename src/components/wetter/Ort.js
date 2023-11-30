import styled from "styled-components";
import React from "react";
import perfekterTag from "./../../icons/perfekter_tag.svg"

const SearchBox = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 20px;
  border: black solid 1px;
  border-radius: 2px;

  & input {
    padding: 10px;
    font-size: 14px;
    border: none;
    outline: none;
    font-family: serif;
    font-weight: bold;
  }
  & button {
    background-color: black;
    font-size: 14px;
    padding: 0 10px;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    font-family: serif;
    font-weight: bold;
  }
`;

const WetterLogo = styled.img`
  width: 140px;
  height: 140px;
  margin: 40px auto;
`;
const Ort = (props) => {
    const { updateOrt, fetchWetter } = props;
    return (
        <>
            <WetterLogo src={perfekterTag} />
            <SearchBox onSubmit={fetchWetter}>
                <input
                    onChange={(e) => updateOrt(e.target.value)}
                    placeholder="Ort"
                />
                <button type={"submit"}>Suchen</button>
            </SearchBox>
        </>
    );
};
export default Ort;