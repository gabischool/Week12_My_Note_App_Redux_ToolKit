
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch, } from "react-redux";
import { useParams , useNavigate} from "react-router-dom";
import { editNotes, fetchNotes } from "../store/api/NoteSlice";

const EditNote = () => {
  const dispatch = useDispatch();
  const [currentNote, setCurrentNote] = useState({});
  const params = useParams();
  const navigate = useNavigate()
  const notes = useSelector((state) => state.note.notes);
  console.log(notes);
  const initialValues = {
    title: currentNote.title,
    content: currentNote.content,
  };

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  useEffect(() => {
    // console.log(note);
    if (notes.length) {
      const note = notes.find((note) => note.id === Number(params.id));
      setCurrentNote(note);
    }
  }, [notes, params.id]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
  });

  const handleSubmit = (values) => {
    dispatch(
      editNotes({
        id: Number(params.id),
        values: values,
      })   
    ).then((resp) => {
      window.location.reload(resp)
      navigate("/");
    });

    console.log(params);

  };

  return (
    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      <Formik
        //  enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-5">
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="title" component="div" className="text-red-500" />
          </div>

          <div className="mb-5">
            <Field
              as="textarea"
              id="content"
              name="content"
              placeholder="Body"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage name="content" component="div" className="text-red-500" />
          </div>

          <button
            type="submit"
            className="block w-full bg-yellow-400 text-black font-bold p-4 rounded-lg hover:bg-yellow-500"
          >
            Update Note
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditNote;
