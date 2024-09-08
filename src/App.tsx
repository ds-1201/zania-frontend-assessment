import React, { useState, useEffect } from "react";

// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Modal from "react-modal";
import { ListManager } from "react-beautiful-dnd-grid";

// interface
import { Cat } from "./interface";

// components
import Card from "./components/card/Card";

// utils
import { sortCatsByPosition } from "./utils";

const App: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fetchCats = () => {
    const cache = localStorage.getItem("cats");
    if (cache) {
      setCats(sortCatsByPosition(JSON.parse(cache)));
      setIsLoading(false);
    } else {
      fetch("/api/cats")
        .then((response) => response.json())
        .then((data) => {
          data = sortCatsByPosition(data);
          setCats(data);
          localStorage.setItem("cats", JSON.stringify(data));
        })
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

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
      sortCats();
      return;
    }
    if (destinationIndex === list.length - 1) {
      list[sourceIndex].position = list[list.length - 1].position + 1;
      sortCats();
      return;
    }
    if (destinationIndex < sourceIndex) {
      list[sourceIndex].position =
        (list[destinationIndex].position +
          list[destinationIndex - 1].position) /
        2;
      sortCats();
      return;
    }
    list[sourceIndex].position =
      (list[destinationIndex].position + list[destinationIndex + 1].position) /
      2;
    sortCats();
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
        <div className="spinner">Loading...</div>
      ) : (
        <ListManager
          items={cats}
          direction="horizontal"
          maxItems={3}
          render={(cat) => <Card cat={cat} openImage={openImage} />}
          onDragEnd={reorderList}
        />
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
