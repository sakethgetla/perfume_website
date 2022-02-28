import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../../Auth";
import EditPerfumeContainer from "../../../components/EditPerfume";
import PerfumeAPI from "../../../apis/PerfumeAPI";

const EditPerfume = () => {
  const [perfumeList, setPerfumeList] = useState([]);
  const [noteList, setNotesList] = useState([]);
  const [noteListNotObject, setNotesListNotObject] = useState([]);
  const auth = useAuth();
  const user_id = auth.user && auth.user.id;
  // const user_id = 1;

  useEffect(() => {
    // perfumes i added
    async function getMyPerfumeList() {
      const response = await PerfumeAPI.get(`?addedBy=${user_id}`);
      console.log("allPerfumes: ", response.data);
      setPerfumeList(response.data);
    }

    getMyPerfumeList();
    getAllNotes();
  }, []);

  async function getAllNotes() {
    // get all the tag options
    try {
      const response = await PerfumeAPI.get("/allScents");
      const notes = response.data.map((scent) => {
        return { value: scent.scents, label: scent.scents };
      });
      console.log("notes: ", notes);
      setNotesList(notes);

      const notesNotObject = notes.map((note) => {
        return note.value;
      });
      setNotesListNotObject(notesNotObject);
    } catch (err) {
      console.error(err);
    }
  }

  async function editPerfumeName(id, newName) {
    console.log("id: ", id);
    console.log("newName: ", newName);
    const response = await PerfumeAPI.put("", {
      perfume_id: id,
      name: newName,
    });

    const updatedPerfumeList = perfumeList.map((perfume) => {
      if (perfume.perfume_id === id) {
        perfume.name = newName;
        return perfume;
      }
      return perfume;
    });
    console.log("updatedPerfumeList", updatedPerfumeList);
    setPerfumeList(updatedPerfumeList);
  }

  async function editPerfumeBrand(id, newBrand) {
    console.log("id: ", id);
    console.log("newBrand: ", newBrand);
    const response = await PerfumeAPI.put("", {
      perfume_id: id,
      brand: newBrand,
    });

    const updatedPerfumeList = perfumeList.map((perfume) => {
      if (perfume.perfume_id === id) {
        perfume.brand = newBrand;
        return perfume;
      }
      return perfume;
    });
    console.log("updatedPerfumeList", updatedPerfumeList);
    setPerfumeList(updatedPerfumeList);
  }

  async function editPerfumeNote(id, newNote) {
    console.log("id: ", id);
    console.log("newNote: ", newNote);
    const response = await PerfumeAPI.put("", {
      perfume_id: id,
      scents: newNote,
    });

    const updatedPerfumeList = perfumeList.map((perfume) => {
      if (perfume.perfume_id === id) {
        perfume.note = newNote;
        return perfume;
      }
      return perfume;
    });
    console.log("updatedPerfumeList", updatedPerfumeList);
    setPerfumeList(updatedPerfumeList);
  }

  async function deletePerfume(id) {
    console.log("deleting perfume: ", id);
    const deletePerfume = await PerfumeAPI.delete("", {
      perfume_id: id,
      data: {
        perfume_id: id,
      },
    });

    console.log("deletePerfume: ", deletePerfume);
    const remainingPerfumeList = perfumeList?.filter(
      (perfume) => perfume.perfume_id !== id
    );
    console.log("remainingPerfumeList: ", remainingPerfumeList);
    setPerfumeList(remainingPerfumeList);
  }

  const renderPerfumeList = perfumeList?.map((perfume) => {
    const { perfume_id, name, brand, scents } = perfume;
    const checkNote = scents === "" ? null : scents;
    return (
      <EditPerfumeContainer
        key={perfume_id}
        id={perfume_id}
        name={name}
        notes={checkNote}
        brand={brand}
        notesList={noteList}
        notesListNotObject={noteListNotObject}
        editPerfumeName={editPerfumeName}
        editPerfumeBrand={editPerfumeBrand}
        editPerfumeNote={editPerfumeNote}
        deletePerfume={deletePerfume}
      />
    );
  });

  return (
    <Container>
      <Heading>Edit Perfume</Heading>
      <PerfumeLayout>{renderPerfumeList}</PerfumeLayout>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  align-self: center;
`;

const Heading = styled.h3`
  margin: 48px 0;
`;

const PerfumeLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 32px;
  padding-bottom: 150px;
`;
export default EditPerfume;
