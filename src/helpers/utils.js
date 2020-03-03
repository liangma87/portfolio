import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
  return function(d) {
    d.date = parse(d.date);
    d.open = +d.open;
    d.high = +d.high;
    d.low = +d.low;
    d.close = +d.close;
    d.volume = +d.volume;

    return d;
  };
}

const parseDate = timeParse("%Y-%m-%d");

export function getData(symbol) {
  const url = "https://cdn.rawgit.com/rrag/react-stockcharts/master/docs/data/" + symbol + ".tsv";
  const promiseSymbol = fetch(url)
    .then(response => response.text())
    .then(data => tsvParse(data, parseData(parseDate)))
  return promiseSymbol;
}

export function getStockApiUrl(endpoint) {
  var url = "https://liang-stock-api.herokuapp.com/api/"
  if (process.env.NODE_ENV !== 'production') {
    url = "http://0.0.0.0:3040/api/"
  }
  url += endpoint + "/"
  return url
}