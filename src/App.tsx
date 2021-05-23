import { Asset, EntryCollection } from "contentful";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Carousel, { Item } from "./components/Carousel";
import DateSelector from "./components/DateSelector";
import Timeline from "./components/Timeline";
import WorkNode from "./components/Node";
import ContentWindow from "./components/ContentWindow";
import client, { ContentModel } from "./contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
const defaultStartDate = DateTime.fromObject({ year: 1993 }).toISODate();
const defaultEndDate = DateTime.now().toISODate();

const getPosition = (
  startDate: string,
  endDate: string,
  targetDate: string
) => {
  const totalTime = DateTime.fromISO(startDate).diff(
    DateTime.fromISO(endDate),
    "days"
  ).days;
  const startToTarget = DateTime.fromISO(startDate).diff(
    DateTime.fromISO(targetDate),
    "days"
  ).days;
  return Math.floor((startToTarget / totalTime) * 100);
};
const formatAssetUrl = (url: string) => `${url}?w=400`;
const App = () => {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [entries, setEntries] = useState<EntryCollection<ContentModel>>();
  useEffect(() => {
    client.getEntries<ContentModel>().then(setEntries).catch(console.error);
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <DateSelector
          onEndDateChange={setEndDate}
          onStartDateChange={setStartDate}
        />
        <Timeline startDate={startDate} endDate={endDate}>
          {entries?.items.map((entry) => {
            if (entry?.fields) {
              return (
                <WorkNode
                  to={`/work/${entry.sys.id}`}
                  key={entry.sys.id}
                  color="red"
                  position={getPosition(
                    startDate,
                    endDate,
                    entry.fields.date ?? startDate
                  )}
                />
              );
            }
            return null;
          })}
        </Timeline>
        <Route
          path="/work/:workId"
          render={({ history, match }) => {
            const entry = entries?.items.find(
              (entry) => entry.sys.id === match.params.workId
            );
            if (!entry) return null;
            const assets = entry.fields.images.map((image) => {
              const asset = entries?.includes.Asset as Array<Asset>;
              return asset.find(
                (asset: Asset) => asset.sys.id === image.sys.id
              );
            });
            return (
              <ContentWindow onCloseClick={() => history.push("/")}>
                <h1>{entry.fields.workTitle}</h1>
                <Carousel>
                  {assets.map((asset) =>
                    asset ? (
                      <Item>
                        <img
                          key={asset.sys.id}
                          src={formatAssetUrl(asset.fields.file.url)}
                          alt={asset.fields.file.fileName}
                        />
                      </Item>
                    ) : null
                  )}
                </Carousel>
                {entry.fields.title
                  ? documentToReactComponents(entry.fields.title)
                  : null}
              </ContentWindow>
            );
          }}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
