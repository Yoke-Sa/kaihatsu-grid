import React, { useContext, useEffect, useState } from "react"
import { MapContainer, TileLayer, useMapEvents, Circle } from "react-leaflet"
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css"
import { CircleContext, LatLngRadius } from "../../pages";
//Marker壊れたとき用
import L from "leaflet"
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'


const position = new LatLng(38.72311671577611, 141.0346841825174);
const zoomlevel = 18;


const hoge: LatLngRadius[] = [];
const CircleMarker = () => {
    const { circle, setCircle, radius, setRadius } = useContext(CircleContext);


    useMapEvents({
        click(e) {
            setCircle((prevValue) => {
                const newValue = [...prevValue, { pos: e.latlng, r: radius }]
                console.log('newValue', newValue)
                return newValue
            })

        }
    })
    return (
        <React.Fragment>
            {circle.map((e, index) =>
                <Circle center={e.pos}
                    pathOptions={{ fillColor: "blue" }}
                    radius={e.r}
                    key={index}
                    stroke={false}
                />
            )}
        </React.Fragment>
    )
}

const BaseCircleMap = () => {

    return (
        <MapContainer center={position} zoom={zoomlevel} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                minZoom={16}
                maxNativeZoom={zoomlevel}
                maxZoom={21}
            />
            <CircleMarker />
        </MapContainer>
    )
}
export default BaseCircleMap;