import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

import SelectDropdown from "./SelectDropdown";
import Loading from "./Loading";

import { ReactComponent as DeleteSVG } from "../assets/trash.svg";
import { ReactComponent as TagSVG } from "../assets/tag.svg";
import { ReactComponent as PencilSVG } from "../assets/pencil.svg";

const Perfume = ({
  id,
  name,
  notes,
  brand,
  notesList,
  notesListNotObject,
  editPerfumeName,
  editPerfumeBrand,
  editPerfumeNote,
  deletePerfume,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBrand, setIsEditingBrand] = useState(false);
  const [modalSubmit, setModalSubmit] = useState(false);
  const [newName, setNewName] = useState(`${name}`);
  const [newBrand, setBrand] = useState(`${brand}`);
  const [selectedNote, setSelectedNote] = useState(notes);
  const [modalSelectedNote, setModalSelectedNote] = useState(selectedNote);

  // Modal States
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    // for accessibility when the modal opens
    ReactModal.setAppElement(document.getElementById("root"));
  }, []);

  useEffect(() => {}, [isEditingName]);

  function handleOpenEdit(changeStateHook, e) {
    changeStateHook(e.target.value);
  }

  function handleNameChange() {
    setIsEditingName(false);
    if (newName !== name) {
      editPerfumeName(id, newName);
      setNewName(`${newName}`);
      console.log("submitting name changes: ", newName);
    }
  }

  function handleBrandChange() {
    setIsEditingBrand(false);
    if (newBrand !== brand) {
      editPerfumeBrand(id, newBrand);
      setBrand(`${newBrand}`);
      console.log("submitting brand changes: ", newBrand);
    }
  }

  function handleSingleSelectChange(newValue, actionMeta) {
    console.log("actionMeta.value", actionMeta.value);
    setModalSelectedNote(actionMeta.value);
    // setSelectedNote(actionMeta.value);
  }

  function handleOpenModal(modalHook) {
    modalHook(true);
    setIsEditingName(false);
    setIsEditingBrand(false);
  }

  function handleCloseModal(modalHook) {
    modalHook(false);
    setIsEditingName(false);
    setIsEditingBrand(false);
  }

  function handleModalUpdate(modalHook) {
    setModalSubmit(true);
    setTimeout(() => {
      setModalSubmit(false);
      handleCloseModal(modalHook);
    }, 800);
  }

  function handleDeletePerfume(id) {
    setShowDeleteModal(true);
    //  deletePerfume(id);
  }
  const notEditingTemplate = (defaultValue, editingStateHook, isBrand) => {
    return (
      <NotEditingContainer onClick={() => editingStateHook(true)}>
        <Label brand={isBrand ? "grey" : "black"}>{defaultValue}</Label>
        <SVGContainer noMargin>
          <PencilSVG />
        </SVGContainer>
      </NotEditingContainer>
    );
  };

  const handleBlur = (update) => {
    update();
  };

  const editingTemplate = (newValue, update, changeStateHook) => {
    return (
      <EditingContainer>
        <Input
          value={newValue}
          onChange={(e) => handleOpenEdit(changeStateHook, e)}
          onBlur={() => handleBlur(update)}
          autoFocus
        />
      </EditingContainer>
    );
  };

  return (
    <PerfumeContainer>
      <Picture>
        <b>Perfume Picture</b>
      </Picture>
      {isEditingName
        ? editingTemplate(newName, handleNameChange, setNewName)
        : notEditingTemplate(name, setIsEditingName)}

      {isEditingBrand
        ? editingTemplate(newBrand, handleBrandChange, setBrand)
        : notEditingTemplate(brand, setIsEditingBrand, true)}

      <div>
        <ButtonContainer>
          <Note>{selectedNote ? `#${selectedNote}` : "No Note"}</Note>
          <SVGContainer>
            <DeleteSVG onClick={() => handleDeletePerfume(id)} />
          </SVGContainer>
          <SVGContainer noMargin>
            <TagSVG onClick={() => handleOpenModal(setShowNoteModal)} />
          </SVGContainer>
        </ButtonContainer>
      </div>

      {/* Delete Modal */}
      <StyledModal
        isOpen={showDeleteModal}
        onRequestClose={() => handleCloseModal(setShowDeleteModal)}
      >
        <>
          <ModalHeader>
            <b>Are you sure you want to delete {name}?</b>
          </ModalHeader>
          <ModalContentContainer>
            <ModalButtonContainer>
              <ModalCancelButton
                onClick={() => handleCloseModal(setShowDeleteModal)}
              >
                Cancel
              </ModalCancelButton>
              <ModalDeleteButton
                onClick={() => {
                  deletePerfume(id);
                }}
                type="submit"
              >
                <span>Delete</span>
              </ModalDeleteButton>
            </ModalButtonContainer>
          </ModalContentContainer>
        </>
      </StyledModal>

      {/* Note Modal */}
      <StyledModal
        isOpen={showNoteModal}
        onRequestClose={() => handleCloseModal(setShowNoteModal)}
      >
        <>
          <ModalHeader>
            <b>Assign notes</b>
          </ModalHeader>
          <ModalContentContainer>
            <div>
              <p>
                Assign notes to
                <b> {name}:</b>
              </p>
            </div>
            <SelectDropdown
              name={`notes`}
              placeholder={"Add a note..."}
              selectOptions={notesList}
              indexOfNote={notesListNotObject.indexOf(modalSelectedNote)}
              onChange={handleSingleSelectChange}
            />
            <ModalButtonContainer>
              <ModalCancelButton
                border
                onClick={() => handleCloseModal(setShowNoteModal)}
              >
                Cancel
              </ModalCancelButton>
              <ModalUpdateButton
                onClick={() => {
                  editPerfumeNote(id, modalSelectedNote);
                  handleModalUpdate(setShowNoteModal);
                  setSelectedNote(modalSelectedNote);
                }}
                type="submit"
              >
                {modalSubmit ? <Loading /> : <span>Update</span>}
              </ModalUpdateButton>
            </ModalButtonContainer>
          </ModalContentContainer>
        </>
      </StyledModal>
    </PerfumeContainer>
  );
};

const PerfumeContainer = styled.div`
  display: flex;
  // flex-grow, flex-shrink, flex-basis
  flex: 1 0 33%;
  flex-direction: column;

  border-radius: 8px;
  padding: 16px;
  background: #f6f6f7;
  align-self: center;
`;

const StyledModal = styled(ReactModal)`
  position: absolute;
  top: 35%;
  left: 50%;
  margin-top: -50px;
  margin-left: -250px;

  display: flex;
  flex-direction: column;
  width: 500px;

  background: white;
  border-radius: 8px;
`;

const ModalHeader = styled.div`
  background: #f6f6f7;
  border-bottom: #838383;
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 8px 8px 0 0px;
`;

const Picture = styled.div`
  height: 250px;
  background: #64c7ff;
  border-radius: 8px;
  display: grid;
  align-items: center;
  justify-items: center;
  margin-bottom: 16px;
`;

const NotEditingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
  :hover {
    cursor: text;
  }
`;

const EditingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  border: 1px solid #2984f8;
  border-radius: 4px;
  box-shadow: 0px 0px 0px 4px rgba(41, 132, 248, 0.25);
  margin-bottom: 8px;
  :hover {
    cursor: text;
  }
`;

const Label = styled.div`
  margin-right: auto;
  font-size: 16px;
  color: ${(params) => params.brand};
`;

const Input = styled.input`
  font-size: 14px;
  width: 100%;
  padding-right: 24px;
  border: 0px;
  border-radius: 4px;

  :focus,
  :active {
    border: 0px;
  }
`;

const SubmitButton = styled.div`
  color: #4380f3;
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 10;
  font-size: 12px;
  align-self: center;
  justify-self: center;

  :hover {
    cursor: pointer;
  }

  background: #e4eaf7;
  border-radius: 4px;
  padding: 1px 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  color: black !important;
  margin-top: 8px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  margin-top: 36px;
  justify-content: center;
  color: black !important;
`;

const ModalCancelButton = styled.div`
  padding: 8px 16px;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  margin: 0 8px;
  cursor: pointer;

  :hover {
    border: ${(props) => (props.border ? "1px solid #006af0" : null)};
  }
`;

const ModalUpdateButton = styled.div`
  color: white;
  padding: 8px 16px;
  background: #2984f8;
  border-radius: 4px;

  cursor: pointer;
  display: flex;
  flex: 0 1 16px;
  justify-items: center;
  align-items: center;
  margin: 0 8px;

  :hover {
    background: #006af0;
  }
`;

const ModalDeleteButton = styled.div`
  color: white;
  padding: 8px 16px;
  background: #ff0000;
  border-radius: 4px;

  cursor: pointer;
  display: flex;
  flex: 0 1 16px;
  justify-items: center;
  align-items: center;
  margin: 0 8px;

  :hover {
    background: #de0000;
  }
`;

const SVGContainer = styled.div`
  display: inline-block;
  margin-right: ${(props) => (props.noMargin ? "8px" : "24px")};
  cursor: pointer;
  transform: scale(1.2);
  transition: transform 0.2s;
  display: grid;
  align-content: center;
  justify-content: center;

  :hover {
    transform: scale(1.3);
  }
`;

const ModalContentContainer = styled.div`
  padding: 0 24px 36px 24px;
`;

const Note = styled.div`
  display: inline-block;
  margin-right: auto;
  background: #e4eaf7;
  color: #4380f3;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
`;

export default Perfume;
