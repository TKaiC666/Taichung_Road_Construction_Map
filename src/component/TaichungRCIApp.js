import React, { useState, useEffect, useCallback, useMemo } from "react";
import Map from "./Map";
import InfoBlock from "./InfoBlock";
import InfoButton from "./InfoButton";
import MakerMessage from "./MakerMessage";

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

  const fetchData = useCallback(() => {
    const reconstructData = (data) => {
      function convertData(data) {
        const convertStringCoor2Num = (lat, lng) => {
          let locationObject = { lat: 0, lng: 0 };
          locationObject.lat = Number(lat);
          locationObject.lng = Number(lng);

          return locationObject;
        };

        const splitPolygonData = (polygon) => {
          let coordArray = polygon.slice(12, polygon.length - 2);
          if (polygon === "") {
            return null;
          }

          coordArray = coordArray.split(", ");
          coordArray = coordArray.map((i) => i.split(" "));
          coordArray = coordArray.map((i) => convertStringCoor2Num(i[1], i[0]));

          return coordArray;
        };

        let convertPart = {
          date: {
            start: {
              year: Number(data["核准起日"].substring(0, 3)) + 1911,
              month: Number(data["核准起日"].substring(3, 5)),
              day: Number(data["核准起日"].substring(5)),
            },
            end: {
              year: Number(data["核准迄日"].substring(0, 3)) + 1911,
              month: Number(data["核准迄日"].substring(3, 5)),
              day: Number(data["核准迄日"].substring(5)),
            },
          },
          personInCharge: {
            name: data["承辦人"].substring(0, 1) + "◯◯",
          },
          coordinate: {
            lat: convertStringCoor2Num(data["中心點Y坐標"], data["中心點X坐標"])
              .lat,
            lng: convertStringCoor2Num(data["中心點Y坐標"], data["中心點X坐標"])
              .lng,
            polygon: splitPolygonData(data["施工範圍坐標"]),
          },
        };

        return convertPart;
      }

      let convertedPart = convertData(data);

      let newData = {
        title: data["工程名稱"],
        distriction: data["區域名稱"],
        address: data["地點"],
        pipeType: data["管線工程類別"],
        constructionType: data["案件類別"],
        workingState: data["是否開工"],
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
        applicationNumber: data["申請書編號"],
        licenseNumber: data["許可證編號"],
        applicant: data["申請單位"],
        contractor: {
          name: data["廠商名稱"],
          phone: data["廠商電話"],
        },
        personInCharge: {
          name: convertedPart.personInCharge.name,
          phone: data["承辦人電話"],
        },
        coordinate: {
          lat: convertedPart.coordinate.lat,
          lng: convertedPart.coordinate.lng,
          polygon: convertedPart.coordinate.polygon,
        },
      };

      return newData;
    };

    const handleData = (data) => {
      let _data = data;
      let newData = [];
      for (let i = 0; i < _data.length; i++) {
        newData.push(reconstructData(_data[i]));
      }
      return newData;
    };

    const fetchingData = () => {
      console.time("fetch花費時間");
      fetch(process.env.REACT_APP_API_URL)
        .then((response) => {
          console.timeEnd("fetch花費時間");
          if (response.status === 200) {
            return response.text();
          }
          throw new Error("response was not ok.");
        })
        .then((data) => {
          if (data[0] !== "[") {
            console.error("fetch error : \n", data);
            setConstructionsData(null);
          } else {
            let newData = handleData(JSON.parse(data));
            setConstructionsData(newData);
          }
        })
        .catch((error) => {
          console.error("fetch error : ", error.message);
          setConstructionsData(null);
        });
    };

    fetchingData();
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
