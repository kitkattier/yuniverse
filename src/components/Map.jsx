import { React, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { getEvents } from "/data-utils/api-utils.js";
import logo from "../assets/logo.png";
import MapModal from "./MapModal";

function Map({ createMode, addLocation, addName }) {
  const mapRef = useRef();
  const geoRef = useRef();
  const mapContainerRef = useRef();
  const [events, setEvents] = useState([]); // event location
  const [selectedEvent, setSelectedEvent] = useState([]); // event id

  const modal = useRef();

  // Initialize the map (runs only once)
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [153.021072, -27.470125], // Default center (Brisbane)
      zoom: 12,
    });

    geoRef.current = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      reverseGeocode: true,
    });

    mapRef.current.addControl(geoRef.current);

    if (createMode) {
      const marker = new mapboxgl.Marker({
        draggable: true,
      });

      const onDragEnd = () => {
        const lngLat = marker.getLngLat();
        geoRef.current.query(`${lngLat.lat}, ${lngLat.lng}`);
      };

      marker.on("dragend", onDragEnd);

      // Snap the marker to the Geocoder's result
      geoRef.current.on("result", (event) => {
        const { center } = event.result;
        marker.setLngLat(center);
        addLocation(center, event.result.place_name);
      });

      marker.setLngLat([153.021072, -27.470125]).addTo(mapRef.current);
    }

    // Clean up map on component unmount
    return () => {
      mapRef.current.remove();
    };
  }, [createMode]);

  // Fetch event locations and add markers (runs whenever events change)
  useEffect(() => {
    async function loadEventMarkers() {
      try {
        const eventArr = await getEvents();
        setEvents(eventArr); // Store locations in state
      } catch (error) {
        console.error("Failed to load event locations:", error);
      }
    }

    if (!createMode) {
      loadEventMarkers(); // Fetch event locations if not in create mode
    }
  }, [createMode]);

  // Add event markers to the map (runs when `events` is updated)
  useEffect(() => {
    if (!createMode && events.length > 0) {
      events.forEach((event) => {
        const el = document.createElement("div");
        el.className = "marker w-[60px] h-[60px] rounded-full bg-cover";
        el.style.backgroundImage = `url(${logo})`; // Correct the background image path
        setSelectedEvent(event);

        // Split the location string into coordinates
        const coordinates = event.event_location
          .replace(/[()]/g, "")
          .split(",")
          .map(Number);

        el.addEventListener("click", () => {
          mapRef.current.flyTo({
            center: [coordinates[1], coordinates[0]], // [lng, lat]
            zoom: 14, // Optional: zoom level after flying to the marker
            speed: 1.5, // Optional: speed of the fly animation (default is 1.2)
          });

          geoRef.current.query(`${coordinates[0]}, ${coordinates[1]}`);

          geoRef.current.on("result", (result) => {
            event.event_place_name = result.result.place_name;
            setSelectedEvent(event);
            geoRef.current({ marker: false });
          });

          // Set the selected event

          modal.current.showModal();
        });

        if (coordinates.length === 2) {
          new mapboxgl.Marker(el)
            .setLngLat([coordinates[1], coordinates[0]]) // [lng, lat]
            .addTo(mapRef.current);
        }
      });
    }
  }, [events, createMode]);

  return (
    <div className="mx-12 mt-5 flex align-middle justify-center h-[75vh] space-x-6 z-10">
      <MapModal event={selectedEvent} modal={modal} ref={modal} />
      <div
        id="map-container"
        className="grow rounded-lg"
        ref={mapContainerRef}
      ></div>
    </div>
  );
}

export default Map;
