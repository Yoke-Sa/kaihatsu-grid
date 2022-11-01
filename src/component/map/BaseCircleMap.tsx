import React, { useContext, useEffect, useState } from "react"
import { MapContainer, TileLayer, useMapEvents, Circle } from "react-leaflet"
import { LatLng, point } from "leaflet";
import "leaflet/dist/leaflet.css"
import { CircleContext, LatLngRadius, LocationPointContext } from "../../pages";
//Marker壊れたとき用
import L from "leaflet";
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'


const position = new LatLng(38.72311671577611, 141.0346841825174);
const nativeZoomlevel = 18;

const element: any = document.querySelector(".map");
const style = getComputedStyle(element);
const zoomlevel = Number(style.getPropertyValue('--zoom-level'));

const hoge: LatLngRadius[] = [];
const CircleMarker = () => {
    const { circle, setCircle, radius, setRadius } = useContext(CircleContext);
    const { setPoly } = useContext(LocationPointContext);
    
    useMapEvents({
        click(e) {
            setCircle((prevValue) => {
                const newValue = [...prevValue, { pos: e.latlng, r: radius }];
                console.log('newValue', newValue);
                return newValue;
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
                    eventHandlers={{
                        contextmenu: (e) => {
                            if (confirm('この領域を削除しますか?')) {
                                let index = circle.indexOf({ pos: e.latlng, r: radius });
                                circle.splice(index, 1);
                                setPoly([[]]);
                            }
                        }
                    }}
                />
            )}
        </React.Fragment>
    )
}

const BaseCircleMap = () => {

    return (
        <MapContainer center={position} zoom={zoomlevel} scrollWheelZoom={false} doubleClickZoom={false} touchZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                minZoom={17}
                maxNativeZoom={nativeZoomlevel}
                maxZoom={21}
            />
            <CircleMarker />
        </MapContainer>
    )
}
export default BaseCircleMap;