import {useState} from "react";
import axios, {Axios} from "axios";
import styled from "styled-components";
import Wetter from "./Wetter";
import OrtComponent from "./Ort";


let API_KEY = "4a791d9bdcea8810f317d1d6d4a577a8"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 380px;
  padding: 20px 10px;
  margin: auto;
  border-radius: 4px;
  box-shadow: 0 3px 6px 0 #555;
  background: white;
  font-family: serif;
`;

const WetterApp = () => {
    const [ort, updateOrt] = useState();
    const [wetter, updateWetter] = useState();
    const fetchWetter = async (e) => {
        e.preventDefault();
        const response = ((await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${ort}&appid=${API_KEY}`,
        ))).data;
        console.log(response)
        updateWetter(response);
    };
    return (
        <Container>
            {ort && wetter ? (
                <Wetter wetter={wetter} city={ort} />
            ) : (
                <OrtComponent updateOrt={updateOrt} fetchWetter={fetchWetter} />
            )}
        </Container>
    );
}

export default WetterApp;