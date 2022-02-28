import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PerfumeContainer from "./PerfumeContainer";
import { perfumeList } from "../_data/PerfumeList";

const PerfumeLayout = ({ edit }) => {
  const [currentList, setCurrentList] = useState(perfumeList);
  console.log("currentList: ", currentList);

  useEffect(() => {
    console.log("updating currentList: ", currentList);
  }, [currentList]);

  function deletePerfume(id) {
    const newList = currentList.filter((p) => p.id !== id);

    console.log("deleting id: ", id);
    console.log("newList: ", newList);
    setCurrentList(newList);
    // send changes database - make sure you use "newList" value
  }
  function handleChange(props) {
    console.log("props: ", props.target.value);
    // let inputToChange = currentList.filter((perfume) => {
    //   if (perfume.id === props.target.id) {
    //     perfume.valuek;
    //   }
    // });

    // console.log("e.target.value: ", e.target.value);
    // setPerfumeName(e.target.value);
  }
  return (
    <PerfumeWrapper>
      {currentList.map((perfume, i) => {
        return (
          <PerfumeContainer
            key={perfume.id}
            id={perfume.id}
            name={perfume.name}
            tags={perfume.tags}
            deletePerfume={(id) => deletePerfume(id)}
            onChange={handleChange}
            input={true}
          />
        );
      })}
      {edit && perfumeList.length === 0 && <p>No more perfumes to delete!</p>}
    </PerfumeWrapper>
  );
};

const PerfumeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default PerfumeLayout;
