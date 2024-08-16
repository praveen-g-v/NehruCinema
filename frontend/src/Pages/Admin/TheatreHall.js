import React from "react";
import { useState } from "react";
import ReactGridLayout, { Responsive, WidthProvider } from "react-grid-layout";
import axios from "../../api/axios";
const ResponsiveGridLayout = WidthProvider(Responsive);

const TheatreHall = () => {
  const [alphabets, setAlphabets] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ]);
  const [theatreHallName, setTheatreHallName] = useState("");
  const [hallRow, setHallRow] = useState(0); // Stores selected hall for editing or booking
  const [hallRowSeats, setHallRowSeats] = useState(0); // Stores selected seats for booking
  const [newLayout, setNewLayout] = useState({}); // State for creating a new seating layout
  const [location, setlocation] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const submitNewHall = async () => {
    try {
      if (theatreHallName) {
        if (hallRow > 0) {
          if (hallRowSeats > 0) {
            if (hallRow > 25) {
              alert("Hall Row cannot be greater than 25 rows");
            } else {
              if (window.confirm("You wont be able to edit these details")) {
                const resp = await axios.post("/movie/addtheatrehall", {
                  hallname: theatreHallName,
                  row: hallRow,
                  rowseats: hallRowSeats,
                  location: location,
                  layout: newLayout.layout,
                });
                if (resp.status === 200) {
                  alert("Hall has created Successfully");
                }
              }
            }
          } else {
            alert("Hall Row Seats cannot be zero or less than zero");
          }
        } else {
          alert("Hall Rows cannot be zero or less than zero");
        }
      } else {
        alert("Please Enter Hall Name");
      }
    } catch (err) {}
  };

  function generateIdArray(rows, cols) {
    let idArray = [];
    console.log(cols, rows);
    for (let i = 0; i < rows; i++) {
      let val = [];
      for (let j = 0; j < cols; j++) {
        val[j] = {
          id: alphabets[i] + "" + j,
          attribute: "seats",
          i: i,
          j: j,
          alphabet: alphabets[i],
        };
      }
      idArray[i] = val;
    }
    console.log(idArray);
    return idArray;
  }

  // Example usage
  // const myArray = generateIdArray(3, 4);
  // console.log(myArray);
  const generateLayout = (row, col) => {
    let layout = {
      col: col,
      row: row,
      layout: generateIdArray(row, col),
    };
    // console.log(layout.lg);
    return layout;
  };

  const changeAttribute = (i, j) => {
    let tempLayout = newLayout;
    setShowPreview(false);
    let tempatt = tempLayout.layout[i][j];
    tempatt.attribute = tempatt.attribute === "seats" ? "empty" : "seats";
    console.log(tempatt.attribute);
    tempLayout.layout[i][j] = tempatt;
    setNewLayout({ ...tempLayout });
  };

  const handleSubmitNewHall = (e) => {
    e.preventDefault();
    let hallname = e.target[0].value;
    let loc = e.target[1].value;
    let row = e.target[2].value;
    // let col = e.target[2].value;
    let rowseats = e.target[3].value;
    // generateLayout(row, rowseats);
    // console.log(hallname);
    setNewLayout(generateLayout(row, rowseats));
    setTheatreHallName(hallname);
    setlocation(loc);
    setHallRow(row);
    setHallRowSeats(rowseats);
    // console.log(generateLayout(row, rowseats));
  };
  return (
    <div className="flex-6 container min-h-screen  mx-auto p-4 mt-8 mb-9 md:mb-16">
      <h2>Add new Theatre Hall</h2>
      <form onSubmit={(event) => handleSubmitNewHall(event)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Hall Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rows"
            className="block text-sm font-medium text-gray-700"
          >
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
            required
            min={1}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rows"
            className="block text-sm font-medium text-gray-700"
          >
            Number of Rows:(Please include Pathway also)
          </label>
          <input
            type="number"
            id="rows"
            name="rows"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
            required
            min={1}
          />
        </div>
        {/* <div className="mb-4">
          <label
            htmlFor="columns"
            className="block text-sm font-medium text-gray-700"
          >
            Number of Columns:
          </label>
          <input
            type="number"
            id="columns"
            name="columns"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
            required
            min={1}
          />
        </div> */}
        <div className="mb-4">
          <label
            htmlFor="seatsPerRow"
            className="block text-sm font-medium text-gray-700"
          >
            Seats per Row:
          </label>
          <input
            type="number"
            id="seatsPerRow"
            name="seatsPerRow"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md border border-gray-300 py-2 px-3"
            required
            min={1} // Ensure at least one seat per row
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create Hall
        </button>
      </form>
      {/* {console.log(newLayout.col)} */}
      <div className="mt-2">
        <div className={`flex flex-col`}>
          {newLayout.layout
            ? newLayout.layout.map((val) => {
                return (
                  <>
                    <div className={`flex flex-1 flex-row`}>
                      {val.map((value) => {
                        return (
                          <div
                            onClick={() => {
                              changeAttribute(value.i, value.j);
                            }}
                            className={`flex-1 m-0 p-1 w-8 h-8 text-center border-2 border-gray-600`}
                          >
                            {value.attribute === "seats" ? "seat" : "      "}
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })
            : null}
        </div>
        {newLayout.layout ? (
          <>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 mt-4 mr-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setShowPreview(!showPreview);
              }}
            >
              Preview Hall
            </button>
            <button
              type="submit"
              className="inline-flex items-center ml-2 px-4 py-2 mt-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                submitNewHall();
              }}
            >
              Submit Hall
            </button>
          </>
        ) : null}
        {showPreview ? (
          <div
            className={`flex flex-col border-black border-2 m-4 p-2 overflow-x-scroll`}
          >
            <div
              className={`flex flex-1 bg-slate-700 flex-row text-slate-200 item-centre justify-center mb-10`}
            >
              Screen
            </div>

            {newLayout.layout.map((val) => {
              return (
                <>
                  <div className={`flex flex-1 md:justify-center  p-2`}>
                    {val.map((value) => {
                      return (
                        <>
                          {value.attribute === "seats" ? (
                            <div className="w-16 h-8 bg-gray-300 border border-gray-500 rounded-lg flex items-center justify-center">
                              <span className="text-gray-600 font-semibold">
                                seat
                              </span>
                            </div>
                          ) : (
                            <div className="w-16 text-white   h-8 rounded-lg flex items-center justify-center">
                              <span className="text-white font-semibold">
                                seat
                              </span>
                            </div>
                          )}
                          {/* <div
                              onClick={() => {
                                changeAttribute(value.i, value.j);
                              }}
                              className={`flex-1 m-0 p-1 w-8 h-8 text-center border-2 border-gray-600`}
                            >
                              {value.attribute === "seats" ? "seat" : "      "}
                            </div> */}
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        ) : null}

        {/* <div
          className={`grid grid-rows-${newLayout.row} grid-cols-${newLayout.col} gap-0`}
        >
          {newLayout.layout
            ? newLayout.layout.map((val) => {
                return (
                  <>
                    {val.map((value) => {
                      return (
                        <div className="text-center border-5 border-gray-100">
                          {value.alphabet + " " + value.j}
                        </div>
                      );
                    })}
                  </>
                );
              })
            : null}
        </div> */}

        {/* <div class="grid grid-cols-14">
          <div class="row-span-1 col-span-1">Cell 1</div>
          <div class="row-span-1 col-span-1">Cell 2</div>
          <div class="row-span-1 col-span-1">Cell 13</div>
          <div class="row-span-1 col-span-1">Cell 14</div>
          <div class="row-span-1 col-span-1">Cell 144</div>
        </div> */}
        {/* <div className="grid grid-cols-3 bg-gray-200 p-4">
            <div className="text-center border-r border-gray-300">Seat 1</div>
            <div className="text-center">Seat 2</div>
          </div>
          <div className="grid grid-cols-4 bg-gray-200 p-4">
            <div className="text-center border-2 border-gray-300">Seat 1</div>
            <div className="text-center">Seat 2</div>

            <div className="text-center border-r border-gray-300">Seat 4</div>
          </div>
          <div className="grid grid-cols-5 bg-gray-200 p-4">
            <div className="text-center border-r border-gray-300">Seat 3</div>
            <div className="text-center">Seat 4</div>
          </div> */}
        {/* Add more grid items as needed */}

        {/* <ResponsiveGridLayout
          rowHeight={15}
          className="layout"
          layouts={newLayout}
        >
          {newLayout.lg.map((item) => {
            console.log(item);
            return (
              <div
                key={item.i}
                style={{ transform: `translate(${item.x}px, ${item.y}px)` }}
                className="border-2 max-w-0 border-blue-700"
              >
               
                {item.i}
              </div>
            );
          })}
        </ResponsiveGridLayout> */}
      </div>
    </div>
  );
};

export default TheatreHall;
