import React, { useState, useEffect, useCallback, useMemo } from "react";
import Map from "./Map";
import InfoBlock from "./InfoBlock";
import InfoButton from "./InfoButton";
import MakerMessage from "./MakerMessage";
import fetchApiData from "../lib/fetchApiData";
import { keyMap } from "../constants/keyMap";

const TaichungRCIApp = () => {
  const [isMobile, setIsMobile] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [closeInfoBlock, setCloseInfoBlock] = useState(null);
  const [makerMessage, setMakerMessage] = useState(null);
  const [constructionsData, setConstructionsData] = useState("loading");
  const [condition, setCondition] = useState({
    workingState: "是",
    distriction: 0,
    date: { start: null, end: null },
    stack: ["workingState"],
  });
  const [mapParameters, setMapParameters] = useState({
    center: { lat: 24.1512535, lng: 120.6617366 },
    polygon: null,
    zoom: 12,
    selectMarker: null,
    closeInfoWindow: null,
  });

  const INITAIL = useCallback(() => {
    let bool = null;
    changeInfoWindowHeight();
    bool = isWidthUnder(428);
    window.addEventListener("resize", changeInfoWindowHeight);
    window.addEventListener("resize", () => isWidthUnder(428));
    findUserLocation();
    initialInfoBlockDisplay(bool);
  }, []);

  const findUserLocation = () => {
    const handleUserLocation = (position) => {
      let _mapParameters = {
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        polygon: null,
        zoom: 12,
        selectMarker: null,
        closeInfoWindow: null,
      };
      setMapParameters(_mapParameters);
      setUserLocation(_mapParameters.center);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        handleUserLocation(position);
      });
    } else {
      console.log("geolocation is not available");
    }
  };

  const initialInfoBlockDisplay = (bool) => {
    if (bool === false) {
      setCloseInfoBlock(false);
    }
  };

  const changeInfoWindowHeight = () => {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight / 100}px`
    );
  };

  const isWidthUnder = (width) => {
    let bool = null;
    if (window.innerWidth <= width) bool = true;
    else bool = false;
    setIsMobile(bool);
    return bool;
  };

  const convertDate2Num = (date) => {
    let [year, month, day] = Object.values(date);
    year = year.toString();
    month = month.toString();
    day = day.toString();

    if (month.length === 1) month = "0" + month;
    if (day.length === 1) day = "0" + day;

    return parseInt(year + month + day, 10);
  };

  const sliceData = (data) => {
    let _data = data;
    let newData = [];
    for (let i = 0; i < _data.length; i += 10) {
      newData.push(_data.slice(i, i + 10));
    }
    return newData;
  };

  const fetchData = useCallback(async () => {
    const reconstructData = (data) => {
      function convertData(data) {
        const convertStringCoor2Num = (lat, lng) => {
          let locationObject = { lat: 0, lng: 0 };
          locationObject.lat = Number(lat);
          locationObject.lng = Number(lng);

          return locationObject;
        };

        /**
         * @todo: use WKT converter to process
         */
        const splitPolygonData = (polygon) => {
          // workaround
          const POLYGON_PATTERN = /^POLYGON\(\(.*\)\)$/;
          if (!POLYGON_PATTERN.test(polygon.replace(/\s/g, ""))) return null;
          const POLYGON_PREFIX = "POLYGON((";
          const POLYGON_SUFFIX = "))";
          const COMMA = ",";
          const polygonCoordinate = polygon
            .replace(/\s/g, "")
            .split(POLYGON_PREFIX)[1]
            .split(POLYGON_SUFFIX)[0]
            .split(COMMA)
            .map((coordinate) => {
              const TAICHUNG_LATITUDE = "24.";
              const [lngString, wrongLatString] =
                coordinate.split(TAICHUNG_LATITUDE);
              const latString = TAICHUNG_LATITUDE + wrongLatString;
              return { lat: Number(latString), lng: Number(lngString) };
            });

          return polygonCoordinate;
        };

        let convertPart = {
          date: {
            start: {
              year: Number(data[keyMap.startDate].substring(0, 3)) + 1911,
              month: Number(data[keyMap.startDate].substring(3, 5)),
              day: Number(data[keyMap.startDate].substring(5)),
            },
            end: {
              year: Number(data[keyMap.endDate].substring(0, 3)) + 1911,
              month: Number(data[keyMap.endDate].substring(3, 5)),
              day: Number(data[keyMap.endDate].substring(5)),
            },
          },
          personInCharge: {
            name: data[keyMap.contactName].substring(0, 1) + "◯◯",
          },
          coordinate: {
            lat: convertStringCoor2Num(data[keyMap.lat], data[keyMap.lng]).lat,
            lng: convertStringCoor2Num(data[keyMap.lat], data[keyMap.lng]).lng,
            polygon: splitPolygonData(data[keyMap.geometry]),
          },
        };

        return convertPart;
      }

      let convertedPart = convertData(data);

      // TODO: use keyMap to reconstruct data
      let newData = {
        title: data[keyMap.projectName],
        distriction: data[keyMap.district],
        address: data[keyMap.location],
        pipeType: data[keyMap.pipeType],
        constructionType: data[keyMap.caseType],
        workingState: data[keyMap.isStarted],
        date: {
          start: {
            year: convertedPart.date.start.year,
            month: convertedPart.date.start.month,
            day: convertedPart.date.start.day,
          },
          end: {
            year: convertedPart.date.end.year,
            month: convertedPart.date.end.month,
            day: convertedPart.date.end.day,
          },
        },
        applicationNumber: data[keyMap.applicationId],
        licenseNumber: data[keyMap.permitId],
        applicant: data[keyMap.applicantUnit],
        contractor: {
          name: data[keyMap.contractorName],
          phone: data[keyMap.contractorPhone],
        },
        personInCharge: {
          name: convertedPart.personInCharge.name,
          phone: data[keyMap.contactPhone],
        },
        coordinate: {
          lat: convertedPart.coordinate.lat,
          lng: convertedPart.coordinate.lng,
          polygon: convertedPart.coordinate.polygon,
        },
      };

      return newData;
    };

    const rawApiData = await fetchApiData(process.env.REACT_APP_API_URL).catch(
      () => {
        setConstructionsData(null);
      }
    );
    setConstructionsData(rawApiData.map((e) => reconstructData(e)));
  }, []);

  useEffect(() => {
    INITAIL();
    fetchData();
  }, [INITAIL, fetchData]);

  const filteredData = useMemo(() => {
    const filteringData = (condition) => {
      let data = constructionsData;
      let newData = [];
      if (data === null || data === "loading") {
        newData = data;
      } else if (condition.stack.length === 3) {
        newData = data.filter(
          (object) =>
            ((convertDate2Num(condition.date.start) >=
              convertDate2Num(object.date.start) &&
              convertDate2Num(condition.date.start) <=
                convertDate2Num(object.date.end)) ||
              (convertDate2Num(condition.date.end) >=
                convertDate2Num(object.date.start) &&
                convertDate2Num(condition.date.end) <=
                  convertDate2Num(object.date.end))) &&
            object.workingState === condition.workingState &&
            object.distriction === condition.distriction
        );
      } else if (condition.stack.length === 2) {
        if (condition.stack.indexOf("date") !== -1) {
          let anotherCondition =
            condition.stack[1 - condition.stack.indexOf("date")];
          newData = data.filter(
            (object) =>
              ((convertDate2Num(condition.date.start) >=
                convertDate2Num(object.date.start) &&
                convertDate2Num(condition.date.start) <=
                  convertDate2Num(object.date.end)) ||
                (convertDate2Num(condition.date.end) >=
                  convertDate2Num(object.date.start) &&
                  convertDate2Num(condition.date.end) <=
                    convertDate2Num(object.date.end))) &&
              object[anotherCondition] === condition[anotherCondition]
          );
        } else {
          newData = data.filter(
            (object) =>
              object.workingState === condition.workingState &&
              object.distriction === condition.distriction
          );
        }
      } else if (condition.stack.length === 1) {
        if (condition.distriction !== 0) {
          newData = data.filter(
            (object) => object.distriction === condition.distriction
          );
        } else if (
          condition.date.start !== null &&
          condition.date.end !== null
        ) {
          newData = data.filter(
            (object) =>
              (convertDate2Num(condition.date.start) >=
                convertDate2Num(object.date.start) &&
                convertDate2Num(condition.date.start) <=
                  convertDate2Num(object.date.end)) ||
              (convertDate2Num(condition.date.end) >=
                convertDate2Num(object.date.start) &&
                convertDate2Num(condition.date.end) <=
                  convertDate2Num(object.date.end))
          );
        } else if (condition.workingState !== 0) {
          newData = data.filter(
            (object) => object.workingState === condition.workingState
          );
        }
      }

      return newData;
    };

    let newData = filteringData(condition);
    return newData;
  }, [condition, constructionsData]);

  const selectorsOptions = useMemo(() => {
    let _stack = condition.stack;
    let _options = {
      workingState: [],
      distriction: [],
      date: { start: {}, end: {} },
    };
    if (
      _stack.length >= 0 &&
      constructionsData !== "loading" &&
      constructionsData !== null
    ) {
      _options.date.start = { ...constructionsData[0].date.start };
      _options.date.end = { ...constructionsData[0].date.end };
      for (let object of constructionsData) {
        if (_options.workingState.indexOf(object.workingState) === -1)
          _options.workingState.push(object.workingState);
        if (_options.distriction.indexOf(object.distriction) === -1)
          _options.distriction.push(object.distriction);
        if (
          convertDate2Num(object.date.start) <=
          convertDate2Num(_options.date.start)
        )
          _options.date.start = { ...object.date.start };
        if (
          convertDate2Num(object.date.end) >= convertDate2Num(_options.date.end)
        )
          _options.date.end = { ...object.date.end };
      }
    }
    return _options;
  }, [condition.stack, constructionsData]);

  const handleCloseClick = () => {
    let _closeInfoBlock = closeInfoBlock;
    if (_closeInfoBlock !== null) {
      _closeInfoBlock = !_closeInfoBlock;
    } else _closeInfoBlock = false;
    setCloseInfoBlock(_closeInfoBlock);
  };

  const handleMakerMessageClick = () => {
    let _makerMessage = makerMessage;
    if (makerMessage !== null) {
      _makerMessage = !_makerMessage;
    } else _makerMessage = true;
    setMakerMessage(_makerMessage);
  };

  if (constructionsData === "loading" || constructionsData === null) {
    return (
      <div>
        <Map
          constructionsData={null}
          mapParameters={mapParameters}
          setMapParameters={setMapParameters}
        />
        <InfoBlock value={constructionsData} />
      </div>
    );
  } else {
    let data = null;
    if (
      condition.distriction === 0 &&
      condition.date.start === null &&
      condition.date.end === null &&
      condition.workingState === 0
    ) {
      data = constructionsData;
    } else {
      data = filteredData;
    }
    return (
      <div className="container">
        <Map
          constructionsData={sliceData(data)}
          mapParameters={mapParameters}
          closeInfoBlock={closeInfoBlock}
          setMapParameters={setMapParameters}
          makerMessage={makerMessage}
          isMobile={isMobile}
          userLocation={userLocation}
        />
        <InfoButton
          closeInfoBlock={closeInfoBlock}
          makerMessage={makerMessage}
          handleCloseClick={handleCloseClick}
          handleMakerMessageClick={handleMakerMessageClick}
          userLocation={userLocation}
          mapParameters={mapParameters}
          setMapParameters={setMapParameters}
        />
        <InfoBlock
          value={sliceData(data)}
          length={data.length}
          option={selectorsOptions}
          condition={condition}
          mapParameters={mapParameters}
          closeInfoBlock={closeInfoBlock}
          isMobile={isMobile}
          handleCloseClick={handleCloseClick}
          setCondition={setCondition}
          setMapParameters={setMapParameters}
        />
        <MakerMessage
          makerMessage={makerMessage}
          handleMakerMessageClick={handleMakerMessageClick}
        />
      </div>
    );
  }
};

export default TaichungRCIApp;
