import React from "react";
import { useState } from "react";
import AddPerfume from '../Perfume/Add/Add';
import EditPerfume from '../Perfume/Edit/Edit';
import Perfumes from '../Perfume';

function App() {

  const [showAddPerfume, setShowAddPerfume] = useState(false);
  const [showEditPerfume, setShowEditPerfume] = useState(false);

  function showEditContent() {
    setShowAddPerfume(false);
    setShowEditPerfume(true);
  }

  function showAddContent() {
    setShowAddPerfume(true);
    setShowEditPerfume(false);
  }

  function renderMainSection() {
    return (
      <>
        {/* render add perfume */}
        {showAddPerfume ? <AddPerfume/> : null}

        {/* render Edit perfume */}
        {showEditPerfume ? <EditPerfume/> : null}

        {/* render all perfumes */}
        {(!showAddPerfume && !showEditPerfume) ? <Perfumes/> : null}
      </>
    )
  }

  return (
    <div className="App">

      {/* sidebar */}
      <section>
        <h1>Sidebar</h1>
        <button>Filter</button>
        <button onClick={() => showAddContent()}>Add Perfume</button>
        <button onClick={() => showEditContent()}>Edit Perfume</button>
      </section>

      {/* main content */}
      <section>
        {renderMainSection()}
      </section>
    </div>
  );
}

export default App;
