import React, { useState, useEffect } from "react";

// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Modal from "react-modal";
import { ListManager } from "react-beautiful-dnd-grid";
import moment from "moment";

// interface
import { Cat } from "./interface";

// components
import Card from "./components/card/Card";

// utils
import { sortCatsByPosition } from "./utils";
import Skeleton from "react-loading-skeleton";

const App: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [lastSaveTime, setLastSaveTime] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const fetchCats = () => {
    setIsLoading(true);
    // fetch data from cache
    if (localStorage.getItem("cats")) {
      let data = JSON.parse(localStorage.getItem("cats")!);
      data = sortCatsByPosition(data);
      setCats(data);
      setIsLoading(false);
      return;
    } else {
      // fetch data from API
      fetch("/api/cats")
        .then((response) => response.json())
        .then((data) => {
          data = sortCatsByPosition(data);
          setCats(data);
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  };

  // Function to save documents via the REST API
  const saveCats = async () => {
    setSaving(true);
    try {
      await fetch("/api/cats", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cats),
      });
      setLastSaveTime(Date.now());
      setUnsavedChanges(false);
      localStorage.setItem("cats", JSON.stringify(cats));
    } catch (error) {
      console.error("Failed to save documents:", error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  // Call the API to save documents every 5 seconds if there are unsaved changes
  useEffect(() => {
    if (!unsavedChanges) return;
    const interval = setInterval(() => {
      if (unsavedChanges) {
        saveCats();
      }
    }, 5000);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unsavedChanges]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (lastSaveTime) {
        setLastSaveTime((prevTime) => prevTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSaveTime]);

  // Draggable Handlers
  const sortCats = () => {
    setCats((prev) => sortCatsByPosition(prev));
  };

  const reorderList = (sourceIndex: number, destinationIndex: number) => {
    if (destinationIndex === sourceIndex) {
      return;
    }
    const list = cats;
    if (destinationIndex === 0) {
      list[sourceIndex].position = list[0].position - 1;
    } else if (destinationIndex === list.length - 1) {
      list[sourceIndex].position = list[list.length - 1].position + 1;
    } else if (destinationIndex < sourceIndex) {
      list[sourceIndex].position =
        (list[destinationIndex].position +
          list[destinationIndex - 1].position) /
        2;
    } else {
      list[sourceIndex].position =
        (list[destinationIndex].position +
          list[destinationIndex + 1].position) /
        2;
    }
    sortCats();
    setUnsavedChanges(true);
  };

  // Modal Handlers
  const openImage = (src: string) => {
    setSelectedImage(src);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      {isLoading ? (
        // <div className="spinner">Loading...</div>
        <ListManager
          items={[1, 2, 3, 4, 5]}
          direction="horizontal"
          maxItems={3}
          render={() => (
            <Skeleton className="skeleton" width={"200px"} height={"220px"} />
          )}
          onDragEnd={reorderList}
        />
      ) : (
        <>
          <ListManager
            items={cats}
            direction="horizontal"
            maxItems={3}
            render={(cat) => <Card cat={cat} openImage={openImage} />}
            onDragEnd={reorderList}
          />
          <div>
            {saving && <p> Saving...</p>}
            {!saving && lastSaveTime && (
              <p>Saved {`${moment(lastSaveTime).fromNow()}`}</p>
            )}
          </div>
        </>
      )}

      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeModal}
        className="modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <img src={selectedImage!} alt="Document" />
      </Modal>
    </div>
  );
};

export default App;
