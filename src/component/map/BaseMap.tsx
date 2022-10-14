import React, { useContext, useEffect } from "react"
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet"
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css"
import { LocationPointContext } from "../../pages";
//Marker壊れたとき用
import L from "leaflet"
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'


const position = new LatLng(38.72311671577611, 141.0346841825174);
const zoomlevel = 18;

const ClickMarker = () => {

    const { point, setPoint } = useContext(LocationPointContext);
    useMapEvents({
        click(e) {
            setPoint((prevValue) => {
                const newValue = [...prevValue, e.latlng]
                return newValue
            });
        }
    })
    return (
        <React.Fragment>
            {point.map((point, index) => <Marker position={point} key={index}></Marker>)}
        </React.Fragment>
    )
}

const BaseMap = () => {

    return (
        <MapContainer center={position} zoom={zoomlevel} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                minZoom={16}
                maxNativeZoom={zoomlevel}
                maxZoom={21}
            />
            <ClickMarker />
        </MapContainer>
    )
}
export default BaseMap;