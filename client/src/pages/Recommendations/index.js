import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import { Link, Route, useRouteMatch } from "react-router-dom";
import { useAuth, Logout } from "./../../Auth";
import PerfumeSearch from "../../components/PerfumeSearch";
//import PerfumeLayout from "../../components/PerfumeLayout";
//import Chat from "./components/Chat";

function Recs() {
  const [perfumeList, setPerfumeList] = useState([]);
    const auth = useAuth();
    const ur_user_id = auth.user.id;

  useEffect(() => {
    //console.log(msg);
    //setMsgs(c.data);
      rend();
  }, []);

    const rend = async () => {
        let q = { params: {} };
        q['params']['user_id'] = ur_user_id;
        try {
	    await axios.get('http://localhost:8000/user/myrecommendations', q).then( (c) => {
		console.log(typeof(c.data));
		console.log(c.data);
		setPerfumeList(c.data);
                //if (msgsList[0] == null || msgsList[0]['message_id'] != c.data[0]['message_id']){
		//    setMsgsList(c.data);
		//    console.log('reload');
                //} else {
		//    console.log('not reload');
                //}
		//setMsgs(c.data[0]);
	    }
	    );
        } catch (e) {
            console.error(e);
        }
        //return ( <div>{ms.map(m => <div>{m}</div>)}</div>);
        //return ( <div></div>);
    };


    let renderPerfumeList = perfumeList?.map((perfumeobj) => {
    //const m = perfume.name;

    console.log(perfumeobj[1][0]);

        let perfume = perfumeobj[1][0];
        const { name, brand, scents, perfume_id, item_rating, middle_note, base_note } = perfume;
        //let perfume = {};
	return (
	    <PerfumeSearch
		key={perfume_id}
		id={perfume_id}
		name={name}
		brand={brand}
		scents={scents}
		rating={item_rating}
              middle_note={middle_note}
              base_note={base_note}
	    />
	);
    });

  return (
    <div>
      <h1> Your Recommendations </h1>
      <PerfumeLayout>{renderPerfumeList}</PerfumeLayout>
    </div>
  );

    
};
const PerfumeLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 32px;
  padding-bottom: 150px;
`;
export default Recs;
