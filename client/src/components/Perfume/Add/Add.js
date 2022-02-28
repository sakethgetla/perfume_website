import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { perfumeList } from '../_data/PerfumeList';

const Add = () => {

    const formik = useFormik({
        initialValues: {
          name: 'perfume3',
          gender: 'Male',
            //   notes: [],
            //   tags: []
          notes: 'note1',
          tags: 'tag1',
          picture: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),

            gender: Yup.string()
            .oneOf(
                ['Pick a gender', 'Male', 'Female', 'Everyone'],
                'Invalid Gender Type'
            )
            .required('Required'),

            // notes: Yup.array()
            // .of(Yup.string())
            notes: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),

            // tags: Yup.array()
            // .of(Yup.string())
            tags: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),

            picture: Yup.string()
        }),
        onSubmit: values => {
            console.log("values: ", values);

            let newPerfume = {
                id: values.name,
                name: values.name,
                gender:values.gender,
                notes:values.notes,
                tag:values.tags,
                addedBy:""
            }
            let duplicatePerfumes = perfumeList.filter( perfume => 
                    perfume.name === newPerfume.name || 
                    perfume.id === newPerfume.id
            )
            console.log("duplicatePerfumes: ", duplicatePerfumes)

            if (duplicatePerfumes.length === 0) {
                perfumeList.push(values);
                // send to Database
            } else {
                console.log("This perfume has already been added.");
                console.log("perfumeList: ", perfumeList);
            }
        },
    });
    
    return (
        <div>
            <h1>Add Perfume</h1>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <button>Add Picture</button>
                </div>
                
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </div>

                <div>
                    <label htmlFor="name">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        onChange={formik.handleChange}
                        value={formik.values.gender}
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Everyone">Everyone</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="notes">Notes</label>
                    <input
                        id="notes"
                        name="notes"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.notes}
                    />
                </div>

                <div>
                    <label htmlFor="tags">Tags</label>
                    <input
                        id="tags"
                        name="tags"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.tags}
                    />
                </div>
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Add;