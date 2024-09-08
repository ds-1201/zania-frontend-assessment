import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Modal from "react-modal";

// Import images
import bankDraftImage from "./assets/bank-draft.png";
import billOfLadingImage from "./assets/bill-of-lading.png";
import invoiceImage from "./assets/invoice.png";
import bankDraft2Image from "./assets/bank-draft.png";
import billOfLading2Image from "./assets/bill-of-lading.png";

// Type definition for document
interface Document {
  type: string;
  title: string;
  position: number;
}

const App: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Map document types to images
  const imageMap: { [key: string]: string } = {
    "bank-draft": bankDraftImage,
    "bill-of-lading": billOfLadingImage,
    invoice: invoiceImage,
    "bank-draft-2": bankDraft2Image,
    "bill-of-lading-2": billOfLading2Image,
  };

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        const sortedDocuments = data.sort(
          (a: Document, b: Document) => a.position - b.position
        );
        setDocuments(sortedDocuments);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const onDragEnd = (result: any) => {
    // Exit if no valid drop destination
    if (!result.destination) return;

    const reorderedDocuments = Array.from(documents);
    // Remove dragged item
    const [movedItem] = reorderedDocuments.splice(result.source.index, 1);
    // Insert dragged item into the new position
    reorderedDocuments.splice(result.destination.index, 0, movedItem);

    // Update the position based on the new order
    const updatedDocuments = reorderedDocuments.map((doc, index) => ({
      ...doc,
      position: index,
    }));

    setDocuments(updatedDocuments);
  };

  const openImage = (type: string) => {
    setSelectedImage(imageMap[type]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      {isLoading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="documents">
            {(provided) => (
              <div
                className="grid"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {documents?.map(({ type, title, position }, index) => (
                  <Draggable
                    key={type}
                    draggableId={position.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => openImage(type)}
                      >
                        <img
                          src={imageMap[type]}
                          alt={title}
                          className="thumbnail"
                        />
                        <h3>{title}</h3>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      <Modal
        isOpen={!!selectedImage}
        onRequestClose={closeModal}
        className="modal"
      >
        <img src={selectedImage!} alt="Document" />
      </Modal>
    </div>
  );
};

export default App;
