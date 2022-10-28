import React, { useContext, useRef, useState } from "react";
import { MapContainer, Marker, Popup, Polyline, TileLayer, useMapEvents } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import { LocationPointContext } from "../../pages";
//Marker壊れたとき用
import * as L from "leaflet";
L.Icon.Default.imagePath = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/";

// let greenIcon = new L.Icon({
//     iconUrl: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF",
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
// })

const position = new LatLng(38.72311671577611, 141.0346841825174);
const nativeZoomlevel = 18;

const element: any = document.querySelector(".map");
const style = getComputedStyle(element);
const zoomlevel = Number(style.getPropertyValue("--zoom-level"));

const LinePoly = () => {
	const { point, setPoint } = useContext(LocationPointContext);
	// const { poly, setPoly } = useContext(LocationPointContext);

	return (
		<React.Fragment>
			{point.map((p, index) => (
				<Polyline positions={point} key={index} className={"road"} />
			))}
		</React.Fragment>
	);
};

const ClickMarker = () => {
	const { point, setPoint, setPoly } = useContext(LocationPointContext);
	// useMapEvents({
	// 	click(e) {
	// 		setPoint((prevValue) => {
	// 			const newValue = [...prevValue, e.latlng];
	// 			// document.querySelector(".road")?.classList.remove("road-hidden");
	// 			return newValue;
	// 		});
	// 	},
	// });
	return (
		<React.Fragment>
			{point.map((pos, index) => (
				<Marker
					position={pos}
					key={index}
					riseOnHover={true}
					eventHandlers={{
						contextmenu: (e) => {
							if (confirm("この目的地を削除します")) {
								let index = point.indexOf(e.latlng);
								point.splice(index, 1);
								setPoly([[]]);
								// setPoint(point);
								// document.querySelector(".road")?.classList.add("road-hidden");
							}
						},
					}}
				>
					<Popup className="marker-text" autoClose={false} closeOnClick={false}>
						{index + 1}番目
					</Popup>
				</Marker>
			))}
		</React.Fragment>
	);
};

const RouteMap = () => {
	return (
		<MapContainer center={position} zoom={zoomlevel} scrollWheelZoom={false} doubleClickZoom={false} touchZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				minZoom={17}
				maxNativeZoom={nativeZoomlevel}
				maxZoom={21}
			/>
			<ClickMarker />
			<LinePoly />
		</MapContainer>
	);
};
export default RouteMap;
