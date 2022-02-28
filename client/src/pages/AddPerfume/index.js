import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../../Auth";
import { useFormik } from "formik";
import * as Yup from "yup";

// import AddImage from "./components/AddImage";
import SelectDropdown from "../../components/SelectDropdown";
import PerfumeAPI from "../../apis/PerfumeAPI";

const Add = () => {
  const [tagOptions, setTagOptions] = useState([]);
  const auth = useAuth();
  const user_id = auth.user && auth.user.id;
  // const user_id = 1;

  useEffect(() => {
    const getTags = async () => {
      try {
        const tags = await PerfumeAPI.get("/allScents");
        const tagList = tags.data.map((tag) => {
          return { value: tag.scents, label: tag.scents };
        });

        setTagOptions(tagList);
        console.log(tagList);
      } catch (error) {
        console.error(error);
      }
    };

    getTags();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      brand: "",
      tags: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),

      brand: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),

      tags: Yup.object(),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("values: ", values);
      const { brand, name, tags } = values;

      const scents = tags.value;
      console.log("scents: ", scents);
      const payload = {
        brand: brand,
        name: name,
        scents: scents,
        addedBy: user_id,
      };

      async function addPerfume(payload) {
        try {
          const response = await PerfumeAPI.post("/", payload);
          console.log("adding perfume response: ", response);
        } catch (err) {
          console.error(err);
        }
      }

      addPerfume(payload);
      resetForm({ values: "" });
    },
  });

  return (
    <Container>
      <Centered>
        <Heading>Add Perfume</Heading>
        <Picture>
          <b>Perfume Picture</b>
        </Picture>
        <form onSubmit={formik.handleSubmit}>
          <Value>
            <ValueLabel htmlFor="name">Name</ValueLabel>
            <ValueInput
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </Value>
          <Value>
            <ValueLabel htmlFor="notes">Brand</ValueLabel>
            <ValueInput
              id="brand"
              name="brand"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.brand}
            />
          </Value>
          <ValueLabel marginBottom htmlFor="notes">
            Notes
          </ValueLabel>
          <SelectDropdown
            onChange={formik.setFieldValue}
            placeholder={`Add a note...`}
            selectOptions={tagOptions}
            name={`tags`}
          />
          <div>
            {formik.error?.name}
            {formik.error?.brand}
            {formik.error?.tags}
          </div>
          <ButtonContainer>
            <SubmitButton type="submit">Submit</SubmitButton>
          </ButtonContainer>
        </form>
      </Centered>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Heading = styled.h1`
  margin: 48px 0;
`;

const Centered = styled.div`
  display: flex;
  flex: 0 1;
  flex-direction: column;
  width: 500px;
  align-self: center;
  justify-self: center;
`;

const Picture = styled.div`
  background: #64c7ff;
  height: 270px;
  width: 100%;
  border-radius: 8px;
  display: grid;
  align-items: center;
  justify-items: center;
  margin-bottom: 54px;
`;

const Value = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  margin-bottom: 32px;
  width: 100%;
`;

const ValueLabel = styled.label`
  display: flex;
  justify-self: flex-start;
  font-weight: bold;
  margin-right: 16px;
  margin-bottom: ${(props) => (props.marginBottom ? "16px" : "0")};
`;

const ValueInput = styled.input`
  display: flex;
  flex: 0 1 100%;
  height: 32px;
  font-size: 16px;
  background: #ececec;
  border-radius: 8px;
  border: 0px;
  width: 80%;
  justify-self: flex-end;
  padding-left: 12px;
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

const SubmitButton = styled.button`
  border-radius: 8px;
  font-size: 18px;
  background: #ececec;
  border: 0px;
  padding: 2px 4px;
  display: inline-flex;

  padding: 10px 16px;
  margin: 54px 0px;
  cursor: pointer;

  :hover {
    background: #bbbbbb;
  }
`;
export default Add;
