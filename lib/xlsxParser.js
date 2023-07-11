"use strict";
const sheetJs = require("xlsx");
const abc = [
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
];
exports.onFileSelection = (
  files,
  { showNullProperties = false, hideEmptyRows = true } = {}
) => {
  return new Promise((resolve, _reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      let binary = "";
      const bytes = new Uint8Array(reader.result);
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      resolve(onLoadEvent(binary, reader, hideEmptyRows, showNullProperties));
    });
    reader.readAsArrayBuffer(files);
  });
};
const onLoadEvent = (binary, reader, hideEmptyRows, showNullProperties) => {
  const parsedXls = {};
  let workbook = sheetJs.read(binary, {
    type: "binary",
  });
  const sheetNames = getSheetNames(workbook);
  sheetNames.forEach((name) => {
    const sheet = workbook.Sheets[name];
    const desiredCells = getDesiredCells(sheet);
    const lastColRow = getLastRowCol(desiredCells);
    const columnsAndHeaders = getColumnsAndHeaders(sheet, desiredCells);
    const data = getData(
      lastColRow,
      columnsAndHeaders.excelColumns,
      columnsAndHeaders.headers,
      sheet,
      showNullProperties
    );
    if (hideEmptyRows) {
      const finalData = [];
      data.forEach((element) => {
        let isEmpty = true;
        columnsAndHeaders.headers.forEach((header) => {
          if (element[header]) {
            isEmpty = false;
          }
        });
        if (!isEmpty) {
          finalData.push(element);
        }
      });
      parsedXls[name] = finalData;
    } else {
      parsedXls[name] = data;
    }
  });
  return parsedXls;
};
const getData = (lastColRow, columns, headers, sheet, showNullProperties) => {
  const data = [];
  for (let R = 2; R <= lastColRow; R++) {
    const element = {};
    headers.forEach((header, index) => {
      const cellValue = getValue(sheet, columns[index], R);
      if (cellValue) {
        element[header] = cellValue.w ? cellValue.w : cellValue.v;
      } else if (showNullProperties) {
        element[header] = null;
      }
    });
    if (Object.keys(element).length > 0) {
      data.push(element);
    }
  }
  return data;
};
const getValue = (sheet, column, R) => sheet[`${column}${R}`];
const getSheetNames = (workbook) => workbook.SheetNames;
const getDesiredCells = (worksheet) => worksheet["!ref"];
const getLastRowCol = (cells) => {
  if (cells && typeof cells === 'string') {
    const rows = cells.split(":");
    const lastColRow = rows.length > 1 ? rows[1] : rows[0];
    const lastColLetter = extractLetter(lastColRow);
    const array = lastColRow.split(lastColLetter);
    return Number(array[1]);
  }
  return Number(0);
};
const getColumnsAndHeaders = (worksheet, desired_cells) => {
  const headers = [];
  const excelColumns = [];
  if (desired_cells && typeof desired_cells === 'string') {
    const cells = desired_cells.split(":");
    const lastCell = cells.length > 1 ? cells[1] : cells[0];
    const lastColLetter = extractLetter(lastCell);
    let iterator = 0;
    let accumulator = "";
    let accumulatorIterator = 0;
    while (true) {
      const currentCell = `${accumulator}${abc[iterator++]}`;
      const cellHeader = worksheet[currentCell + 1];
      if (cellHeader) {
        headers.push(cellHeader.v);
        excelColumns.push(currentCell);
      }
      if (lastColLetter == currentCell) {
        return { headers: headers, excelColumns: excelColumns };
      }
      if (iterator >= abc.length) {
        const test = abc[accumulatorIterator++];
        iterator = 0;
        accumulator = test;
      }
    }
  }
  else {
    return { headers: headers, excelColumns: excelColumns };
  }
};
const extractLetter = (str) => {
  const array = str.split(/\d+/);
  return array[0];
};
