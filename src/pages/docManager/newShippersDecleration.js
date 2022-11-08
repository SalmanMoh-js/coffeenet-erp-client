import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Button,
  TextField,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Description, Send, RestartAltRounded, Add } from "@mui/icons-material";
import { addShipDec } from "../../actions/docmanagerActions";
import { emptyErrors, resetUpdate } from "../../actions/generalActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function NewShippersDecleration() {
  const { isDocmanagerAuthenticated } = useSelector((state) => state.auth);
  const { addDataLoading, dataUpdated } = useSelector(
    (state) => state.adminData
  );
  const errors = useSelector((state) => state.errors);
  const Day = new Date();
  const newDate = `${Day.getDate()}/${Day.getMonth() + 1}/${Day.getFullYear()}`;
  const [shipDec, setShipDec] = useState({
    shipper: "",
    product: "",
    vesselAndVoyNumber: "",
    blNumber: "",
    icoNo: "",
    certNo: "",
    blDate: "",
    date: newDate,
    reciever: "",
    destination: "",
    osVesselAndVoyNumber: "",
    osBlNumber: "",
    osDate: "",
    containerNumbers: "",
    sealNumbers: "",
    noOfBags: "",
    grossWeights: "",
    netWeights: "",
    containerNumbersArray: [""],
    sealNumbersArray: [""],
    noOfBagsArray: [""],
    grossWeightsArray: [""],
    netWeightsArray: [""],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const dateChange = (newValue) => {
    setShipDec({
      ...shipDec,
      blDate: newValue,
    });
  };
  const osDateChange = (newValue) => {
    setShipDec({
      ...shipDec,
      osDate: newValue,
    });
  };
  function onAddDecleration(e) {
    e.preventDefault();
    let newDec = shipDec;
    delete newDec.containerNumbersArray;
    delete newDec.grossWeightsArray;
    delete newDec.netWeightsArray;
    delete newDec.noOfBagsArray;
    delete newDec.sealNumbersArray;
    newDec.createdAt = new Date().getTime();
    newDec.blDate = `${shipDec.blDate.getDate()} / ${
      shipDec.blDate.getMonth() + 1
    }/${shipDec.blDate.getFullYear()}`;
    newDec.osDate = `${shipDec.osDate.getDate()} / ${
      shipDec.osDate.getMonth() + 1
    }/${shipDec.osDate.getFullYear()}`;
    setShipDec(newDec);
    dispatch(addShipDec(shipDec));
    console.log(shipDec);
    setShipDec({
      ...shipDec,
      containerNumbersArray: [""],
      sealNumbersArray: [""],
      noOfBagsArray: [""],
      grossWeightsArray: [""],
      netWeightsArray: [""],
    });
  }

  useEffect(() => {
    if (!isDocmanagerAuthenticated) {
      navigate("/");
    }
  }, [isDocmanagerAuthenticated, navigate]);
  useEffect(() => {
    const toastOptions = {
      position: "top-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    };
    if (Object.keys(errors).length > 0 && errors.unknown) {
      toast.error("Unknown Error, Please Try Again", toastOptions);
      setTimeout(() => {
        dispatch(emptyErrors());
      }, 8000);
    }
  }, [errors, dispatch]);
  useEffect(() => {
    const toastOptions = {
      position: "top-right",
      autoClose: 5000,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    };
    if (dataUpdated === "shipDec added") {
      toast.success("Shipping Decleration submitted", toastOptions);
      setTimeout(() => {
        dispatch(resetUpdate());
      }, 8000);
    }
  }, [dataUpdated, dispatch]);
  useEffect(() => {
    setValidated(
      Object.values(shipDec).every((value) => {
        if (!value.toString().trim().length || value === 0) {
          return false;
        }
        return true;
      })
    );
    setValidated(
      shipDec.containerNumbersArray[0] !== "" &&
        shipDec.sealNumbersArray[0] !== "" &&
        shipDec.noOfBagsArray[0] !== "" &&
        shipDec.netWeightsArray[0] !== "" &&
        shipDec.grossWeightsArray[0] !== ""
    );
  }, [shipDec]);
  useEffect(() => {
    if (!isDocmanagerAuthenticated) {
      navigate("/");
    }
  }, [isDocmanagerAuthenticated, navigate]);
  return (
    <>
      <Grid container className="dashboard-container justify-around">
        <form onSubmit={onAddDecleration} className="w-full">
          <Grid className="accounts-list-container w-full -mt-3">
            <div className="w-full flex flex-row justify-between mb-2">
              <p className="h4 text-left">New Shippers Decleration</p>
              <div className="flex flex-row">
                <IconButton
                  variant="contained"
                  onClick={() => {
                    setShipDec({
                      shipper: "",
                      product: "",
                      vesselAndVoyNumber: "",
                      blNumber: "",
                      icoNo: "",
                      certNo: "",
                      blDate: "",
                      date: newDate,
                      reciever: "",
                      destination: "",
                      osVesselAndVoyNumber: "",
                      osBlNumber: "",
                      osDate: "",
                      containerNumbers: "",
                      sealNumbers: "",
                      noOfBags: "",
                      grossWeights: "",
                      netWeights: "",
                      containerNumbersArray: [""],
                      sealNumbersArray: [""],
                      noOfBagsArray: [""],
                      grossWeightsArray: [""],
                      netWeightsArray: [""],
                    });
                  }}
                >
                  <RestartAltRounded />
                </IconButton>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={addDataLoading}
                  sx={{
                    mr: 5,
                    ml: 5,
                  }}
                  disabled={!validated}
                  startIcon={<Send />}
                >
                  Submit
                </LoadingButton>
                <div>
                  <Button
                    startIcon={<Description />}
                    variant="contained"
                    onClick={() => navigate("/shipper-declerations")}
                  >
                    View Declerations
                  </Button>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            className="invoice-layout-container w-full bg-white p-6 overflow-auto"
            style={{ height: "70vh" }}
          >
            <Grid className="title-container w-full text-center mb-8">
              <p className="h4 underline text-center text-gray-700">
                Shippers Decleration
              </p>
            </Grid>
            <Grid className="w-full">
              <Grid
                container
                spacing={2}
                className="invoice-form-container w-full h-fit"
              >
                <Grid item lg={6} className="flex justify-start">
                  <div className="w-full">
                    <p className="h5 text-center text-gray-700">Original</p>
                    <Grid
                      container
                      spacing={2}
                      className="invoice-form-container w-full h-fit"
                    >
                      <Grid item lg={12}>
                        <FormControl fullWidth>
                          <InputLabel>Shipper</InputLabel>
                          <Select
                            labelId="select-label"
                            id="simple-select"
                            value={shipDec.shipper}
                            label="Shipper"
                            onChange={(e) =>
                              setShipDec({
                                ...shipDec,
                                shipper: e.target.value,
                              })
                            }
                          >
                            <MenuItem value="COFFEENET TRADING PLC">
                              COFFEENET TRADING PLC
                            </MenuItem>
                            <MenuItem value="EYOB TESFAYE/SHEGA TEFF">
                              EYOB TESFAYE/SHEGA TEFF
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item lg={12}>
                        <TextField
                          className="w-full"
                          type="text"
                          value={shipDec.product}
                          autoComplete="false"
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              product: e.target.value,
                            })
                          }
                          label="Product"
                        />
                      </Grid>
                      <Grid item lg={6} className="flex justify-start">
                        <TextField
                          className="w-full"
                          type="text"
                          value={shipDec.vesselAndVoyNumber}
                          autoComplete="false"
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              vesselAndVoyNumber: e.target.value,
                            })
                          }
                          label="Vessel & Voy. #"
                        />
                      </Grid>
                      <Grid item lg={6} className="flex justify-start">
                        <TextField
                          className="w-full"
                          type="text"
                          value={shipDec.blNumber}
                          autoComplete="false"
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              blNumber: e.target.value,
                            })
                          }
                          label="BL #"
                        />
                      </Grid>
                      <Grid item lg={6} className="flex justify-start">
                        <TextField
                          className="w-full"
                          type="text"
                          value={shipDec.certNo}
                          autoComplete="false"
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              certNo: e.target.value,
                            })
                          }
                          label="CERT #"
                        />
                      </Grid>
                      <Grid item lg={6} className="flex justify-start">
                        <TextField
                          className="w-full"
                          type="text"
                          value={shipDec.icoNo}
                          autoComplete="false"
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              icoNo: e.target.value,
                            })
                          }
                          label="ICO #"
                        />
                      </Grid>
                      <Grid item lg={12} className="flex justify-start">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            className="w-full"
                            label="Date"
                            inputFormat="dd/MM/yyyy"
                            value={shipDec.blDate}
                            onChange={dateChange}
                            renderInput={(params) => (
                              <TextField {...params} className="w-full" />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <Grid item lg={6} className="flex justify-start">
                  <div className="w-full">
                    <p className="h5 text-center text-gray-700">Other Side</p>
                    <Grid
                      container
                      spacing={2}
                      className="invoice-form-container w-full h-fit"
                    >
                      <Grid item lg={12}>
                        <TextField
                          className="w-full"
                          type="text"
                          value={shipDec.reciever}
                          autoComplete="false"
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              reciever: e.target.value,
                            })
                          }
                          label="Reciever"
                        />
                      </Grid>
                      <Grid item lg={12}>
                        <TextField
                          className="w-full"
                          type="text"
                          value={shipDec.destination}
                          autoComplete="false"
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              destination: e.target.value,
                            })
                          }
                          label="Destination"
                        />
                      </Grid>
                      <Grid item lg={6} className="flex justify-start">
                        <TextField
                          className="w-full"
                          type="text"
                          value={shipDec.osVesselAndVoyNumber}
                          autoComplete="false"
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              osVesselAndVoyNumber: e.target.value,
                            })
                          }
                          label="Vessel & Voy. #"
                        />
                      </Grid>
                      <Grid item lg={6} className="flex justify-start">
                        <TextField
                          className="w-full"
                          type="text"
                          value={shipDec.osBlNumber}
                          autoComplete="false"
                          onChange={(e) =>
                            setShipDec({
                              ...shipDec,
                              osBlNumber: e.target.value,
                            })
                          }
                          label="BL #"
                        />
                      </Grid>
                      <Grid item lg={12} className="flex justify-start">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <MobileDatePicker
                            className="w-full"
                            label="Date"
                            inputFormat="dd/MM/yyyy"
                            value={shipDec.osDate}
                            onChange={osDateChange}
                            renderInput={(params) => (
                              <TextField {...params} className="w-full" />
                            )}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
                <p className="h5 text-center my-4 underline text-gray-700 w-full">
                  Loading Details
                </p>
                {shipDec.containerNumbersArray.map((containerNumber, index) => {
                  return (
                    <Grid key={index} item lg={11} className="flex self-center">
                      <Grid container className="w-full" spacing={2}>
                        <Grid item lg={2} className="flex justify-center">
                          <TextField
                            className="w-full"
                            type="text"
                            value={containerNumber}
                            autoComplete="false"
                            onChange={(e) => {
                              let newContainerNumbers =
                                shipDec.containerNumbersArray;
                              newContainerNumbers[index] = e.target.value;
                              setShipDec({
                                ...shipDec,
                                containerNumbersArray: newContainerNumbers,
                              });
                              setShipDec({
                                ...shipDec,
                                containerNumbers: String(newContainerNumbers),
                              });
                            }}
                            label="Container Number"
                          />
                        </Grid>
                        <Grid item lg={2} className="flex justify-center">
                          <TextField
                            className="w-full"
                            type="text"
                            value={shipDec.sealNumbersArray[index]}
                            autoComplete="false"
                            onChange={(e) => {
                              let newSealNumbers = shipDec.sealNumbersArray;
                              newSealNumbers[index] = e.target.value;
                              setShipDec({
                                ...shipDec,
                                sealNumbersArray: newSealNumbers,
                              });
                              setShipDec({
                                ...shipDec,
                                sealNumbers: String(newSealNumbers),
                              });
                            }}
                            label="Seal Number"
                          />
                        </Grid>
                        <Grid item lg={2} className="flex justify-center">
                          <TextField
                            className="w-full"
                            type="text"
                            value={shipDec.noOfBagsArray[index]}
                            autoComplete="false"
                            onChange={(e) => {
                              let newNoOfBags = shipDec.noOfBagsArray;
                              newNoOfBags[index] = e.target.value;
                              setShipDec({
                                ...shipDec,
                                noOfBagsArray: newNoOfBags,
                              });
                              setShipDec({
                                ...shipDec,
                                noOfBags: String(newNoOfBags),
                              });
                            }}
                            label="No of Bags"
                          />
                        </Grid>
                        <Grid item lg={2} className="flex justify-center">
                          <TextField
                            className="w-full"
                            type="text"
                            value={shipDec.grossWeightsArray[index]}
                            autoComplete="false"
                            onChange={(e) => {
                              let newGrossWeight = shipDec.grossWeightsArray;
                              newGrossWeight[index] = e.target.value;
                              setShipDec({
                                ...shipDec,
                                grossWeightsArray: newGrossWeight,
                              });
                              setShipDec({
                                ...shipDec,
                                grossWeights: String(newGrossWeight),
                              });
                            }}
                            label="Gross Weight"
                          />
                        </Grid>
                        <Grid item lg={2} className="flex justify-center">
                          <TextField
                            className="w-full"
                            type="text"
                            value={shipDec.netWeightsArray[index]}
                            autoComplete="false"
                            onChange={(e) => {
                              let newNetWeight = shipDec.netWeightsArray;
                              newNetWeight[index] = e.target.value;
                              setShipDec({
                                ...shipDec,
                                netWeightsArray: newNetWeight,
                              });
                              setShipDec({
                                ...shipDec,
                                netWeights: String(newNetWeight),
                              });
                            }}
                            label="Net Weight"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
                <Grid className="mt-3">
                  <IconButton
                    onClick={() => {
                      let newContainerNumbersArray =
                        shipDec.containerNumbersArray;
                      newContainerNumbersArray =
                        newContainerNumbersArray.concat("");
                      let newSealNumbersArray = shipDec.sealNumbersArray;
                      newSealNumbersArray = newSealNumbersArray.concat("");
                      let newNoOfBagsArray = shipDec.noOfBagsArray;
                      newNoOfBagsArray = newNoOfBagsArray.concat("");
                      let newNetWeightsArray = shipDec.netWeightsArray;
                      newNetWeightsArray = newNoOfBagsArray.concat("");
                      let newGrossWeightsArray = shipDec.grossWeightsArray;
                      newGrossWeightsArray = newNoOfBagsArray.concat("");
                      setShipDec({
                        ...shipDec,
                        containerNumbersArray: newContainerNumbersArray,
                        sealNumbersArray: newSealNumbersArray,
                        noOfBagsArray: newNoOfBagsArray,
                        netWeightsArray: newNetWeightsArray,
                        grossWeightsArray: newGrossWeightsArray,
                      });
                      console.log(shipDec.sealNumbers);
                    }}
                    sx={{
                      padding: 2,
                      margin: "auto",
                    }}
                  >
                    <Add />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <ToastContainer />
    </>
  );
}

export default NewShippersDecleration;
