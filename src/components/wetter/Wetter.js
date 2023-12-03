import React from "react";
import styled from "styled-components";

import nacht from "./../../icons/nacht.svg"
import perfekterTag from "./../../icons/perfekter_tag.svg"
import regenNacht from "./../../icons/regen_nacht.svg"
import regenTag from "./../../icons/regen_tag.svg"
import sonnigTag from "./../../icons/sonnig_tag.svg"
import sturm from "./../../icons/sturm.svg"
import tag from "./../../icons/tag.svg"
import wolkigNacht from "./../../icons/wolkig_nacht.svg"
import wolkigTag from "./../../icons/wolkig_tag.svg"
import luftFeuchtigkeit from "./../../icons/luft_feuchtigkeit.svg"
import wind from "./../../icons/wind.svg"
import luftDruck from "./../../icons/luft_druck.svg"
import tagNacht from "./../../icons/sonnen_aufuntergang.svg"
import schnee from "./../../icons/schnee.svg"

const WeatherIcons = {
    "01d": sonnigTag,
    "01n": nacht,
    "02d": tag,
    "02n": wolkigNacht,
    "03d": wolkigTag,
    "03n": wolkigTag,
    "04d": perfekterTag,
    "04n": wolkigNacht,
    "09d": regenTag,
    "09n": regenNacht,
    "10d": regenTag,
    "10n": regenNacht,
    "11d": sturm,
    "11n": sturm,
    "13n" : schnee,
    "Sonnenaufgang": tagNacht,
    "Sonnenuntergang": tagNacht,
    "Luftfeuchtigkeit": luftFeuchtigkeit,
    "Luftdruck": luftDruck,
    "Windgeschwindigkeit": wind,
};
const Ort = styled.span`
  margin: 15px auto;
  text-transform: capitalize;
  font-size: 28px;
  font-weight: bold;
`;
const Bedingung = styled.span`
  margin: 20px auto;
  text-transform: capitalize;
  font-size: 14px;
  & span {
    font-size: 28px;
  }
`;
const WetterIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;
const WetterContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 30px auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const WetterInfoContainer = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
const InfoContainer = styled.div`
  display: flex;
  margin: 5px 5px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin: 15px;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;

const WetterInfoComponent = (props) => {
    const {name, value} = props;
    return (
        <InfoContainer>
            <InfoIcon src={WeatherIcons[name]}/>
            <InfoLabel>
                {value}
                <span>{name}</span>
            </InfoLabel>
        </InfoContainer>
    );
};
const Wetter = (props) => {
    const {wetter} = props;
    const isDay = wetter?.weather[0].icon?.includes('d')
    const getTime = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
    }
    return (
        <>
            <WetterContainer>
                <Bedingung>
                    <span>{`${Math.floor(wetter?.main?.temp - 273)}°C`}</span>
                    {`  |  ${wetter?.weather[0].description}`}
                </Bedingung>
                <WetterIcon src={WeatherIcons[wetter?.weather[0].icon]}/>
            </WetterContainer>
            <Ort>{`${wetter?.name}, ${wetter?.sys?.country}`}</Ort>

            <WetterInfoContainer>
                <WetterInfoComponent name={isDay ? "Sonnenuntergang" : "Sonnenaufgang"}
                                      value={`${getTime(wetter?.sys[isDay ? "sunset" : "sunrise"])} Uhr`}/>
                <WetterInfoComponent name={"Luftfeuchtigkeit"} value={`${wetter?.main?.humidity} %`}/>
                <WetterInfoComponent name={"Windgeschwindigkeit"} value={`${wetter?.wind?.speed} kmh`}/>
                <WetterInfoComponent name={"Luftdruck"} value={`${wetter?.main?.pressure} hPa`}/>
            </WetterInfoContainer>
        </>
    );
};

export default Wetter;